import mongoose from 'mongoose'

const { Schema } = mongoose

export interface IMetadata {
  uid?: string
  height?: number
  width?: number
  cameraMake?: string
  cameraModel?: string
  cameraBodySerialNumber?: string
  lensSpecification?: string
  lensModel?: string
  lensSerialNumber?: string
  shutterSpeed?: string
  exposureTime?: string
  apertureValue?: string
  fStop?: number
  focalLength?: string
  colorSpace?: string
  isoSpeed?: number
  exposureMode?: string
  whiteBalance?: string
  originalDate?: string
  resolutionX?: number
  resolutionY?: number
  resolutionUnit?: string
}
export interface IPhoto extends mongoose.Document {
  type: 'image' | 'video'
  originalFilename: string
  thumbnailUrl?: string
  thumbnailUrlSigned?: string
  thumbnailKey?: string
  fileUrl: string
  fileUrlSigned: string
  fileKey: string
  mimetype: string
  size: number
  metadata?: IMetadata
  rawMetadata?: any
  createdAt?: Date
  updatedAt?: Date
}

const photoSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['image', 'video'],
    },
    originalFilename: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
    },
    thumbnailKey: {
      type: String,
    },
    fileKey: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    mimetype: String,
    metadata: {
      uid: String,
      height: Number,
      width: Number,
      cameraMake: String,
      cameraModel: String,
      cameraBodySerialNumber: String,
      lensSpecification: String,
      lensModel: String,
      lensSerialNumber: String,
      shutterSpeed: String,
      exposureTime: String,
      apertureValue: String,
      fStop: Number,
      focalLength: String,
      colorSpace: String,
      isoSpeed: Number,
      exposureMode: String,
      whiteBalance: String,
      originalDate: String,
      resolutionX: Number,
      resolutionY: Number,
      resolutionUnit: String,
    },
    rawMetadata: Schema.Types.Mixed,
    size: Number,
  },
  {
    timestamps: true,
  }
)

export const PhotoModel = mongoose.model<IPhoto>('Photo', photoSchema)
