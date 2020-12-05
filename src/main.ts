import { initQueues } from './config/queues'
import { initMongoose } from './config/mongoose'
import { initExpress } from './config/express'
import { NextFunction, Request, Response } from 'express'

import { config } from './config/config'
import { router as photosRouter } from './modules/photos/photos.ctrl'

const start = async () => {
  await initMongoose()
  await initQueues()

  const app = await initExpress()

  app.use(photosRouter)

  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const error = {
      name: err.name ? err.name : 'InternalError',
      code: 500,
      message: err.message ? err.message : 'Internal Server Error',
      stack:
        config.environment === 'development' && err.stack
          ? err.stack
          : undefined,
    }

    if (error.name === 'CastError') {
      error.code = 400
      error.message = 'Bad request - invalid id'
    } else if (error.name === 'UnauthorizedError') {
      error.code = 401
    }

    console.error(err)

    return res.status(error.code).json(error)
  })

  // start the Express server
  app.listen(config.port, () => {
    console.log(`server started at http://localhost:${config.port}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
