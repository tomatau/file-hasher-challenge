type MainProps = React.ComponentProps<'main'>

export function Main({ className = '', ...props }: MainProps) {
  return (
    <main
      className={`my-10 mx-auto min-w-[400px] max-w-[800px] p-10 bg-white rounded-lg inset-shadow-sm shadow-md flex flex-col gap-4 items-start ${className}`}
      {...props}
    />
  )
}
