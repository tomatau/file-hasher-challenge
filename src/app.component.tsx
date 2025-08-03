import { FileDropper, HashGenerator } from '@/components/features'
import { Main } from '@/components/layout'
import { Button, Heading } from '@/components/ui'
import { useCallback, useState } from 'react'

export function App() {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState('no-file')

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
          <Button
            className='self-center'
            variant='default'
            onClick={() => setStatus('generating')}
            disabled={status === 'generating' || status === 'done'}
          >
            Generate hash
          </Button>
          {(status === 'generating' || status === 'done') && (
            <HashGenerator file={file} onDone={() => setStatus('done')} />
          )}
        </>
      )}
    </Main>
  )
}
