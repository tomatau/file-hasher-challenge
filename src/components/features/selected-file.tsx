import { Tag } from '@/components/ui'

type SelectedFileProps = {
  file: File
}

export function SelectedFile({ file }: SelectedFileProps) {
  return (
    <p className='flex gap-1 flex-row items-baseline'>
      <span className='text-lg'>Current file:</span>
      <Tag>{file.name}</Tag>
    </p>
  )
}
