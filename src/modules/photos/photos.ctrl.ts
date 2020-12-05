import express from 'express'
import multer from 'multer'
import multerS3 from 'multer-s3'

import { config } from '../../config/config'
import { s3 } from '../../config/s3'
import { PhotoService, fileTypes } from './photos.service'

export const router = express.Router()

const upload = multer({
  fileFilter: (req, file, cb) => {
    const isSupportedType = fileTypes.allTypes.includes(file.mimetype)

    if (!isSupportedType) {
      cb(new Error('Invalid file type.'))
    }

    cb(null, true)
  },
  storage: multerS3({
    s3,
    bucket: config.s3.bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

router.get('/photos', async (req, res, next) => {
  const photos = await PhotoService.getPhotos()

  return res.json(photos)
})

router.post('/photos', upload.single('file'), async (req, res, next) => {
  const file: Express.MulterS3.File = req.file as Express.MulterS3.File

  const type = fileTypes.imageTypes.includes(file.mimetype) ? 'image' : 'video'

  const photo = await PhotoService.uploadPhoto(
    {
      type,
      originalFilename: file.originalname,
      fileKey: file.key,
      fileUrl: file.location,
      mimetype: file.mimetype,
      size: file.size,
    },
    {}
  )

  return res.json(photo)
})

// router.get('/photos/:photoId')

// router.put('/photos/:photoId')

// router.delete('/photos/:photoId')
