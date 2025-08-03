import { mock, test, expect, beforeEach, describe } from 'bun:test'

const mockUpdate = mock()
const mockDigest = mock().mockReturnValue('mocked_hash_value')
mock.module('hash-wasm', () => ({
  createSHA256: () => ({
    update: mockUpdate,
    digest: mockDigest,
  }),
}))

const postMessage = mock()
global.self = {
  postMessage,
  onmessage: null,
  // eslint-disable-next-line
} as any

await import('./sha-256.worker.ts')
describe('SHA 256 Worker', () => {
  beforeEach(() => {
    postMessage.mockClear()
    mockUpdate.mockClear()
    mockDigest.mockClear()
  })

  test(`doesn't process if no file is provided`, async () => {
    const event = { data: { file: null } } as MessageEvent
    await self.onmessage!(event)
    expect(postMessage).not.toHaveBeenCalled()
  })

  test('posts "working" and "done" messages for a small file', async () => {
    const fileContent = 'test content'
    const file = new File([fileContent], 'test.txt', { type: 'text/plain' })
    const event = { data: { file } } as MessageEvent

    await self.onmessage!(event)

    expect(postMessage).toHaveBeenCalledWith({
      status: 'working',
      payload: { file, progress: 0 },
    })
    expect(postMessage).toHaveBeenCalledWith({
      status: 'working',
      payload: { file, progress: 100 },
    })
    expect(postMessage).toHaveBeenCalledWith({
      status: 'done',
      payload: { file, hash: 'mocked_hash_value' },
    })

    expect(mockUpdate).toHaveBeenCalledWith(
      new Uint8Array(await file.arrayBuffer())
    )
    expect(mockDigest).toHaveBeenCalledWith('hex')
    expect(postMessage).toHaveBeenCalledTimes(3)
  })

  test('processes a file in multiple chunks', async () => {
    const size = 2000 * 1024 * 1024
    const chunkSize = 64 * 1024 * 1024
    const buffer = new ArrayBuffer(size)
    const file = new File([buffer], 'large-file.bin', {
      type: 'application/octet-stream',
    })
    const event = { data: { file } } as MessageEvent

    await self.onmessage!(event)

    expect(postMessage).toHaveBeenCalledTimes(Math.ceil(size / chunkSize) + 2)
    expect(mockUpdate).toHaveBeenCalledTimes(Math.ceil(size / chunkSize))

    expect(postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        payload: expect.objectContaining({ progress: expect.any(Number) }),
      })
    )

    expect(postMessage).toHaveBeenCalledWith({
      status: 'done',
      payload: { file, hash: 'mocked_hash_value' },
    })
  })
})
