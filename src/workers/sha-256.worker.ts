import { createSHA256 } from 'hash-wasm'
import type { PayloadDone, PayloadWorking } from './worker.types'

self.onmessage = async ({ data: { file } }: MessageEvent<{ file: File }>) => {
  if (!file) return
  const sha256 = await createSHA256()

  self.postMessage({
    status: 'working',
    payload: { received: file },
  } satisfies PayloadWorking)

  const buffer = await file.arrayBuffer()
  const typedbuffer = new Uint8Array(buffer)
  sha256.update(typedbuffer)
  const hash = sha256.digest('hex')

  self.postMessage({
    status: 'done',
    payload: { received: file, hash },
  } satisfies PayloadDone)
}
