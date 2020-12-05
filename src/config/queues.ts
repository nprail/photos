import { Queue } from 'bullmq'
import '../modules/photos/photos.worker'

export const QUEUES: { [key: string]: Queue } = {}

export const initQueues = async () => {
  QUEUES['ProcessFile'] = new Queue('ProcessFile')
}
