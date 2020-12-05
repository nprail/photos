import Ffmpeg, { FfmpegCommand } from 'fluent-ffmpeg'
import path from 'path'
import fs from 'fs-extra'
import ms from 'ms'

const runFfmpeg = (command: FfmpegCommand) => {
  return new Promise((resolve, reject) => {
    command.on('end', resolve).on('error', reject).run()
  })
}

const TMP_DIR = path.resolve('tmp')

export const getRandomIntegerInRange = (min: number, max: number) => {
  const minInt = Math.ceil(min)
  const maxInt = Math.floor(max)

  return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt)
}

export const generateThumbnail = async (
  data: Buffer,
  filename: string,
  length: string
) => {
  await fs.ensureDir(TMP_DIR)

  const inputFile = path.resolve(TMP_DIR, `${new Date().getTime()}-${filename}`)
  await fs.writeFile(inputFile, data)

  const videoDurationSeconds = Math.round(ms(length) / 1000)

  const thumbnailTime = getRandomIntegerInRange(
    0.25 * videoDurationSeconds,
    0.75 * videoDurationSeconds
  )

  const outputFile = path.resolve(TMP_DIR, `${new Date().getTime()}.png`)

  await runFfmpeg(
    Ffmpeg(inputFile)
      .inputOptions([`-ss ${thumbnailTime}`])
      .outputOptions(['-vframes 1'])
      .output(outputFile)
  )

  console.log(outputFile)
}
