import bodyParser from 'body-parser'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

export const initExpress = async () => {
  const app = express()

  app.use(morgan('dev'))

  app.use(cors())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  app.use(bodyParser.json())

  return app
}
