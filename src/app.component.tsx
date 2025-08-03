import { Main } from '@/components/layout'
import { Button, Heading, Textarea } from '@/components/ui'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FileDropper } from './components/features/file-dropper'

function useHash(file: File | null) {
  const workerRef = useRef<Worker>(null)
  useEffect(() => {
    if (!file) return
    const worker = new Worker(new URL('./sha-256.worker.ts', import.meta.url), {
      type: 'module',
    })
    workerRef.current = worker

    worker.postMessage({ file })

    worker.onmessage = e => {
      const { type, payload } = e.data
      console.info('worker message', { type, payload })
    }

    return () => worker.terminate()
  }, [file])
}

export function App() {
  const [file, setFile] = useState<File | null>(null)
  useHash(file)

  const handleSetFile = useCallback((files: FileList | null) => {
    const file = files?.item(0)
    if (file) setFile(file)
    else setFile(null)
  }, [])

  return (
    <Main>
      <Heading>File Hasher</Heading>
      <FileDropper file={file} onSetFile={handleSetFile} />
      {file && (
        <>
          <Button className='self-center' variant='default'>
            Generate hash
          </Button>
          <Textarea
            id='hashed-value'
            placeholder='Your hash will be shown here....'
            className='pointer-events-none placeholder-gray-500'
            readOnly
          />
        </>
      )}
    </Main>
  )
}
