import type { Payload, WorkerStatus } from '@/workers/worker.types'
import { useEffect, useRef, useState } from 'react'

export function useHash(file: File | null) {
  const workerRef = useRef<Worker>(null)
  const [status, setStatus] = useState<WorkerStatus>('idle')
  const [hash, setHash] = useState<string>()
  const [progress, setProgress] = useState<number>()

  useEffect(() => {
    if (!file) {
      setStatus('idle')
      setHash(undefined)
      setProgress(undefined)
      return
    }

    const worker = new Worker(
      new URL('@/workers/sha-256.worker.ts', import.meta.url),
      {
        type: 'module',
      }
    )
    workerRef.current = worker

    worker.postMessage({ file })

    worker.onmessage = (e: MessageEvent<Payload>) => {
      const { status, payload } = e.data
      if (status === 'done') {
        const { hash } = payload
        setHash(hash)
        setStatus('done')
      }
      if (status === 'working') {
        const { progress } = payload
        setStatus('working')
        setProgress(progress)
      }
    }

    return () => worker.terminate()
  }, [file])

  return { status, hash, progress }
}
