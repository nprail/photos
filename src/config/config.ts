import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  environment: string
  dbUrl: string
  s3: {
    bucket: string
    endpoint?: string
    accessKeyId: string
    secretAccessKey: string
  }
}

export const config: Config = {
  port: parseFloat(process.env.PORT || '3030'),
  environment: process.env.NODE_ENV || 'development',
  dbUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/photos',
  s3: {
    bucket: process.env.S3_BUCKET || '',
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.S3_ACCESS_SECRET_KEY || '',
  },
}
