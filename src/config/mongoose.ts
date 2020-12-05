import { config } from './config'
import mongoose from 'mongoose'

export const initMongoose = async () => {
  const mongo = await mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

  const db = mongo.connection.db

  console.log(`MONGODB opened: ${db.databaseName}`)

  db.on('disconnected', (err) => {
    if (err) {
      console.error(err)
    }
    console.log('MONGODB disconnected')
  })

  db.once('open', () => {
    console.log(`MONGODB opened: ${db.databaseName}`)
  })
  db.once('close', () => {
    console.log('MONGODB closed')
  })
  db.on('error', (err) => {
    console.error(err)
    mongo.disconnect()
  })
  db.on('connected', () => {
    console.log('MONGODB connected')
  })
  db.on('reconnected', () => {
    console.log('MONGODB reconnected')
  })
}
