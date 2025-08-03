import { useEffect } from 'react'
import { Textarea } from '@/components/ui'
import { useHash } from './use-hash'

export function HashGenerator({
  file,
  onDone,
}: {
  file: File
  onDone: (hash: string) => void
}) {
  const { status, hash } = useHash(file)

  useEffect(() => {
    if (status === 'done') onDone(hash ?? '')
  }, [status, onDone, hash])

  return (
    <div className='w-full'>
      {status === 'working' && <p>Working...</p>}
      {status === 'done' && <p>Your hash is...</p>}
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
