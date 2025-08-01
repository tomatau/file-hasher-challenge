import { Tag } from '@/components/ui'

export function FileDropperPlaceholder() {
  return (
    <p>
      <Tag variant='muted'>Drag'n'drop</Tag> a file or{' '}
      <Tag variant='muted'>click</Tag> to select to generate a 256-sha hash
    </p>
  )
}
