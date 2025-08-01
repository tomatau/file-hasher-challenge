import { cn } from '@/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const tagVariants = cva('px-2 rounded w-fit', {
  variants: {
    variant: {
      default: 'bg-purple-600 border-purple-800 text-white',
      muted: 'bg-gray-300 text-grey-900',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type TagProps = React.ComponentProps<'span'> & VariantProps<typeof tagVariants>

export function Tag({ variant, className, ...props }: TagProps) {
  return (
    <span
      id='tag'
      {...props}
      className={cn(tagVariants({ variant, className }))}
    />
  )
}
