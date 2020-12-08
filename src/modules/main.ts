import { Router } from 'express'

import { router as photosRouter } from './photos/photos.ctrl'

export const apiRouter = Router()

apiRouter.use(photosRouter)
