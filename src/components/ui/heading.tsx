type HeadingProps = React.ComponentProps<'h1'>

export function Heading({ className, ...props }: HeadingProps) {
  return (
    <h1 {...props} className={`text-2xl font-bold text-center ${className}`} />
  )
}
