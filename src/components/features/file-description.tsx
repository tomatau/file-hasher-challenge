import { Label, Textarea } from '@/components/ui'

type TextareaProps = React.ComponentProps<typeof Textarea>

export function FileDescription({ className, ...props }: TextareaProps) {
  return (
    <div className='flex flex-col gap-2 mb-2'>
      <Label htmlFor='file-description'>File description</Label>
      <Textarea
        id='file-description'
        placeholder='Describe your file'
        className={`${className} placeholder-gray-500`}
        maxLength={500}
        {...props}
      />
    </div>
  )
}
