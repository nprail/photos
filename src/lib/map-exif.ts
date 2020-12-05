import { IMetadata } from '../modules/photos/photos.model'

export const mapExifData = (data: any): IMetadata => {
  const exifData: IMetadata = {
    uid: data.imageUniqueID,
    height:
      data.relatedImageHeight ?? data.sourceImageHeight ?? data.imageHeight,
    width: data.relatedImageWidth ?? data.sourceImageWidth ?? data.imageWidth,
    cameraMake: data.make,
    cameraModel: data.cameraModelName,
    cameraBodySerialNumber: data.serialNumber,
    lensSpecification: data.lensInfo,
    lensModel: data.lensModel,
    lensSerialNumber: data.lensSerialNumber,
    shutterSpeed: data.shutterSpeed,
    exposureTime: data.exposureTime,
    apertureValue: data.apertureValue,
    fStop: data.fNumber,
    focalLength: data.focalLength,
    isoSpeed: data.iso,
    whiteBalance: data.whiteBalance,
    originalDate: data['date/timeOriginal'] ?? data.createDate,
    resolutionX: data.xResolution,
    resolutionY: data.yResolution,
    resolutionUnit: data.resolutionUnit,
    colorSpace: data.colorSpace,
    exposureMode: data.exposureMode,
  }

  return exifData
}
