import { useEffect } from 'react'
import { Progress, Tag, Textarea } from '@/components/ui'
import { useHash } from './use-hash'

export function HashGenerator({
  file,
  onDone,
}: {
  file: File
  onDone: (hash: string) => void
}) {
  const { status, hash, progress } = useHash(file)

  useEffect(() => {
    if (status === 'done') onDone(hash ?? '')
  }, [status, onDone, hash])

  return (
    <div className='w-full'>
      <div className='mb-2'>
        {status === 'working' && (
          <>
            <p>Working...</p>
            <Progress value={progress} />
          </>
        )}
        {status === 'done' && (
          <p>
            Hash for file <Tag variant='muted'>{file.name}</Tag> is...
          </p>
        )}
      </div>
      <Textarea
        id='hashed-value'
        value={hash}
        placeholder='Your hash will be shown here....'
        className='pointer-events-none placeholder-gray-500 '
        readOnly
      />
    </div>
  )
}
