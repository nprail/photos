import exiftool from 'exiftool'

export const exif = {
  metadata: (data: Buffer) => {
    return new Promise((resolve, reject) => {
      exiftool.metadata(data, (err: Error, response: any): any => {
        if (err) {
          return reject(err)
        }

        return resolve({ ...response })
      })
    })
  },
}
