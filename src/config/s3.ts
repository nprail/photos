import AWS from 'aws-sdk'

import { config } from './config'

AWS.config.credentials = {
  accessKeyId: config.s3.accessKeyId,
  secretAccessKey: config.s3.secretAccessKey,
}

export const s3 = new AWS.S3({
  endpoint: config.s3.endpoint,
  signatureVersion: 'v4',
})
