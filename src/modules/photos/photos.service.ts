import { PhotoModel, IPhoto } from './photos.model'
import { s3 } from '../../config/s3'
import { config } from '../../config/config'
import { QUEUES } from '../../config/queues'

const videoTypes = [
  'video/x-flv',
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
]
const imageTypes = [
  'image/jpeg',
  'image/gif',
  'image/png',
  'image/webp',
  'image/tiff',
]
export const fileTypes = {
  imageTypes,
  videoTypes,
  allTypes: [...imageTypes, ...videoTypes],
}

export class PhotoService {
  static async uploadPhoto(file: any, ctx: any) {
    const photo = new PhotoModel(file)

    await photo.save()

    QUEUES.ProcessFile.add('process-file', {
      fileId: photo._id,
    })

    return photo
  }

  static async getPhotos() {
    const photos: IPhoto[] = await PhotoModel.find({}).sort('createdAt').lean()

    const mappedPhotos = await Promise.all(
      photos.map(async (photo) => {
        photo.fileUrlSigned = await s3.getSignedUrlPromise('getObject', {
          Bucket: config.s3.bucket,
          Key: photo.fileKey,
          Expires: 60 * 15,
        })

        if (photo.thumbnailKey) {
          photo.thumbnailUrlSigned = await s3.getSignedUrlPromise('getObject', {
            Bucket: config.s3.bucket,
            Key: photo.thumbnailKey,
            Expires: 60 * 15,
          })
        }

        return photo
      })
    )

    return mappedPhotos
  }

  static async getPhoto() {}

  static async updatePhoto() {}

  static async deletePhoto() {}
}
