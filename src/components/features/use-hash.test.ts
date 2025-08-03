import { renderHook, act } from '@testing-library/react'
import { test, expect, beforeEach, mock, describe } from 'bun:test'
import { useHash } from './use-hash'

let mockWorkerInstance: {
  postMessage: ReturnType<typeof mock>
  terminate: ReturnType<typeof mock>
  onmessage: ((event: MessageEvent) => void) | null
}

global.Worker = mock(() => {
  mockWorkerInstance = {
    postMessage: mock(),
    terminate: mock(),
    onmessage: null,
  }
  return mockWorkerInstance
  // eslint-disable-next-line
}) as any

describe('useHash Hook', () => {
  beforeEach(() => {
    ;(global.Worker as unknown as ReturnType<typeof mock>).mockClear()
  })

  test('initializes with idle status and no hash or progress', () => {
    const { result } = renderHook(() => useHash(null))
    expect(result.current.status).toBe('idle')
    expect(result.current.hash).toBeUndefined()
    expect(result.current.progress).toBeUndefined()
  })

  test('creates a worker and post a message when a file is provided', () => {
    const file = new File(['content'], 'test.txt')
    renderHook(() => useHash(file))

    expect(global.Worker).toHaveBeenCalledTimes(1)
    // Check that the instance's postMessage was called.
    expect(mockWorkerInstance.postMessage).toHaveBeenCalledWith({ file })
  })

  test('updates status to "working" and progress on worker message', () => {
    const file = new File(['content'], 'test.txt')
    const { result } = renderHook(() => useHash(file))

    act(() => {
      if (
        mockWorkerInstance &&
        typeof mockWorkerInstance.onmessage === 'function'
      ) {
        mockWorkerInstance.onmessage({
          data: { status: 'working', payload: { progress: 50 } },
        } as MessageEvent)
      }
    })

    expect(result.current.status).toBe('working')
    expect(result.current.progress).toBe(50)
  })

  test('updates status to "done" and set the hash on worker message', () => {
    const file = new File(['content'], 'test.txt')
    const { result } = renderHook(() => useHash(file))

    act(() => {
      if (
        mockWorkerInstance &&
        typeof mockWorkerInstance.onmessage === 'function'
      ) {
        mockWorkerInstance.onmessage({
          data: { status: 'done', payload: { hash: 'final_hash' } },
        } as MessageEvent)
      }
    })

    expect(result.current.status).toBe('done')
    expect(result.current.hash).toBe('final_hash')
  })

  test('terminates the worker on unmount', () => {
    const file = new File(['content'], 'test.txt')
    const { unmount } = renderHook(() => useHash(file))

    unmount()

    expect(mockWorkerInstance.terminate).toHaveBeenCalledTimes(1)
  })

  test('resets state and terminates worker when the file is cleared', () => {
    const file = new File(['content'], 'test.txt')
    const { result, rerender } = renderHook(({ file }) => useHash(file), {
      initialProps: { file: file as File | null },
    })

    expect(global.Worker).toHaveBeenCalledTimes(1)

    rerender({ file: null })

    expect(result.current.status).toBe('idle')
    expect(result.current.hash).toBeUndefined()
    expect(result.current.progress).toBeUndefined()
    expect(mockWorkerInstance.terminate).toHaveBeenCalledTimes(1)
  })
})
