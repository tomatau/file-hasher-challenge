import { Tag } from '@/components/ui'
import { File, X } from 'lucide-react'
import type { MouseEventHandler } from 'react'

type SelectedFileProps = {
  file: File
  onClickClear: MouseEventHandler<SVGSVGElement>
}

export function SelectedFile({ file, onClickClear }: SelectedFileProps) {
  return (
    <p className='flex gap-1 flex-row items-center justify-between'>
      <span className='flex gap-1 flex-row items-center content-center'>
        <File className='w-6 h-6' />
        <Tag>{file.name}</Tag>
      </span>
      <X
        role='button'
        className='hover:stroke-amber-700 cursor-pointer'
        onClick={onClickClear}
      />
    </p>
  )
}
