import { Tag } from '@/components/ui'

export function FileDropperPlaceholder() {
  return (
    <p>
      <Tag variant='muted'>Drag'n'drop</Tag> a file or{' '}
      <Tag variant='muted'>click</Tag> to select one from your device
    </p>
  )
}
