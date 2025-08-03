import { Tag } from '@/components/ui'
import { File } from 'lucide-react'

export function FileDropperPlaceholder() {
  return (
    <div className='flex flex-col items-center gap-3 text-center'>
      <File className='w-20 h-20 m-auto' />
      <p>
        <Tag variant='muted'>Drag'n'drop</Tag> a file here <br />
        or <Tag variant='muted'>click</Tag> to select one from your device
      </p>
    </div>
  )
}
