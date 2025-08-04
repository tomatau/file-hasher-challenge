import { createSHA256 } from 'hash-wasm'
import type { PayloadDone, PayloadError, PayloadWorking } from './worker.types'

const CHUNK_SIZE = 64 * 1024 * 1024 // 64MB

self.onmessage = async ({ data: { file } }: MessageEvent<{ file: File }>) => {
  if (!file) return
  try {
    const sha256 = await createSHA256()

    let offset = 0

    self.postMessage({
      status: 'working',
      payload: { file, progress: 0 },
    } satisfies PayloadWorking)

    while (offset < file.size) {
      const chunk = file.slice(offset, offset + CHUNK_SIZE)
      const buffer = await chunk.arrayBuffer()
      const typedbuffer = new Uint8Array(buffer)
      sha256.update(typedbuffer)
      offset += buffer.byteLength
      self.postMessage({
        status: 'working',
        payload: { file, progress: (offset / file.size) * 100 },
      } satisfies PayloadWorking)
    }

    const hash = sha256.digest('hex')

    self.postMessage({
      status: 'done',
      payload: { file, hash },
    } satisfies PayloadDone)
  } catch (error) {
    self.postMessage({
      status: 'error',
      payload: { error: error as Error },
    } satisfies PayloadError)
  }
}
