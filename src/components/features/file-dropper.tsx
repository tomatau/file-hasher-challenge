import { SelectedFile } from '@/components/features'
import { useRef } from 'react'
import { FileDrop } from 'react-file-drop'
import { FileDropperPlaceholder } from './file-dropper-placeholder'
import './file-dropper.css'

type FileDropperProps = {
  file: File | null
  onSetFile: (files: FileList | null) => void
}

export function FileDropper({ file, onSetFile }: FileDropperProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <FileDrop
      className='file-drop text-muted-foreground select-none self-stretch'
      onDrop={onSetFile}
      onTargetClick={() => inputRef.current?.click()}
    >
      {file ? (
        <SelectedFile
          onClickClear={e => {
            e.stopPropagation()
            onSetFile(null)
          }}
          file={file}
        />
      ) : (
        <FileDropperPlaceholder />
      )}
      <input
        type='file'
        ref={inputRef}
        className='pointer-events-none hidden'
        onChange={e => onSetFile(e.target.files)}
      />
    </FileDrop>
  )
}
