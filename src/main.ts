import { initQueues } from './config/queues'
import { initMongoose } from './config/mongoose'
import { initExpress } from './config/express'
import { config } from './config/config'

import { apiRouter } from './modules/main'
import { errorHandler } from './lib/middleware/errors'

const start = async () => {
  await initMongoose()
  await initQueues()

  const app = await initExpress()

  app.use('/api/v1', apiRouter)

  app.use(errorHandler)

  // start the Express server
  app.listen(config.port, () => {
    console.log(`server started at http://localhost:${config.port}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
