import { Main } from '@/components/layout'
import { Button, Heading, Textarea } from '@/components/ui'
import { useCallback, useState } from 'react'
import { FileDropper } from './components/features/file-dropper'

export function App() {
  const [file, setFile] = useState<File | null>(null)

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
