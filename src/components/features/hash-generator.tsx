import { Progress, Tag } from '@/components/ui'
import { Copy, Loader } from 'lucide-react'
import { useEffect, useState } from 'react'
import { FileDescription } from './file-description'
import { useHash } from './use-hash'
import { formatFileSize } from '@/utils'

export function HashGenerator({
  file,
  onDone,
}: {
  file: File
  onDone: (hash: string) => void
}) {
  const [description, setDescription] = useState<string>('')
  const { status, hash, progress, error } = useHash(file)

  useEffect(() => {
    if (status === 'done') onDone(hash ?? '')
  }, [status, onDone, hash])

  return (
    <div className='w-full'>
      <FileDescription
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className='mb-2'>
        {status === 'working' && (
          <>
            <p>
              Working... <Loader className='w-4 h-4 inline animate-spin' />
            </p>
            <Progress value={progress} />
          </>
        )}
        {status === 'error' && (
          <>
            <p>There was an error hashing your file. Try a new file.</p>
            <Tag variant='muted' className='text-blue-800'>
              {error}
            </Tag>
          </>
        )}
        {status === 'done' && (
          <div data-test-id='hash-result' className='display'>
            <dl>
              <dt className='font-bold'>File</dt>
              <dd className='mb-1'>
                <Tag variant='muted'>{file.name}</Tag>
              </dd>
              <dt className='font-bold'>Size</dt>
              <dd className='mb-1'>
                <Tag variant='muted'>{formatFileSize(file.size)}</Tag>
              </dd>
              {description && (
                <>
                  <dt className='font-bold'>Description</dt>
                  <dd className='mb-1'>
                    <Tag variant='muted'>{description}</Tag>
                  </dd>
                </>
              )}
              <dt className='font-bold'>Sha 256 hash </dt>
              <dd className='flex gap-2'>
                <Tag variant='muted'>
                  <span className='text-green-800'>{hash}</span>
                </Tag>
                <Copy
                  className='cursor-pointer stroke-gray-500 hover:stroke-purple-500 w-6 h-6'
                  onClick={() => navigator.clipboard.writeText(hash ?? '')}
                />
              </dd>
            </dl>
          </div>
        )}
      </div>
    </div>
  )
}
