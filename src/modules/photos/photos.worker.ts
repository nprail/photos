import { Job, Worker } from 'bullmq'
import { ObjectId } from 'mongoose'
import sharp from 'sharp'

import { config } from '../../config/config'
import { s3 } from '../../config/s3'
import { PhotoModel } from './photos.model'
import { exif } from '../../lib/exiftool'
import { mapExifData } from './../../lib/map-exif'
import { generateThumbnail } from './../../lib/generate-thumbnail'

export const processFile = async (fileId: ObjectId) => {
  console.log(`Processing ${fileId.toString()}`)
  console.time(`process-file-${fileId.toString()}`)

  const file = await PhotoModel.findById(fileId)

  if (!file) {
    throw new Error('No file found')
  }

  const data = await s3
    .getObject({
      Bucket: config.s3.bucket,
      Key: file.fileKey,
    })
    .promise()

  const buffer = data.Body as Buffer

  const metadata: any = await exif.metadata(buffer)
  file.metadata = mapExifData(metadata)
  file.rawMetadata = metadata

  if (file.type === 'image') {
    const thumbnail = await sharp(buffer)
      .resize({
        width: 200,
      })
      .webp()
      .toBuffer()

    const res = await s3
      .upload({
        Bucket: config.s3.bucket,
        Key: file.fileKey + '-thumbnail',
        Body: thumbnail,
        ContentType: 'image/webp',
      })
      .promise()

    file.thumbnailUrl = res.Location
    file.thumbnailKey = res.Key
  }

  if (file.type === 'video') {
    await generateThumbnail(buffer, file.originalFilename, metadata?.duration)
  }

  await file.save()

  console.timeEnd(`process-file-${fileId.toString()}`)
}

const worker = new Worker('ProcessFile', async (job: Job) => {
  try {
    await processFile(job.data.fileId)
  } catch (err) {
    console.error(err)
    throw err
  }
})
