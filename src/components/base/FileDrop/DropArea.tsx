import { ChangeEventHandler, DragEventHandler, memo, useCallback, useRef, useState } from "react"
import styled from "styled-components"
import { EntityTitle } from "@blueprintjs/core"
import clsx from "clsx"
import { mimeTypeMatchesAccept } from "./utils"
import FileArea from "./FileArea"
import { FileDropProps } from "."

const DropAreaBase = styled(FileArea)`
  cursor: pointer;
`

interface DropAreaProps {
  readonly subject: FileDropProps["subject"]
  readonly accept: FileDropProps["accept"]
  readonly multiple: FileDropProps["multiple"]
  readonly onFileList: (fileList: FileList) => void
  readonly onErrors: (errors: string[]) => void
}

const DropArea = memo(({
  subject,
  accept,
  multiple,
  onFileList,
  onErrors,
}: DropAreaProps) => {
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    event.currentTarget.files && onFileList(event.currentTarget.files)
  }, [onFileList])
  const handleDrag: DragEventHandler<HTMLElement> = useCallback(event => {
    event.preventDefault()
    setDragging(true)
  }, [])
  const handleDragLeave: DragEventHandler<HTMLElement> = useCallback(event => {
    event.preventDefault()
    setDragging(false)
  }, [])
  const handleDrop: DragEventHandler<HTMLElement> = useCallback(event => {
    event.preventDefault()
    setDragging(false)
    if (event.dataTransfer.files.length > 0) {
      const fileList = event.dataTransfer.files
      const errors: string[] = []
      if (fileList.length > 1 && !multiple) {
        errors.push('only 1 file can be selected')
      }
      for (const file of fileList) {
        if (!mimeTypeMatchesAccept(file?.type ?? "", accept)) {
          errors.push('file type not accepted')
          break
        }
      }
      const hasError = errors.length > 0
      hasError ? onErrors(errors) : onFileList(event.dataTransfer.files)
    }
  }, [onFileList])

  return (
    <DropAreaBase
      onClick={handleClick}
      onDrop={handleDrop}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDragLeave={handleDragLeave}
    >
      <EntityTitle
        ellipsize
        icon="document"
        title={`Drag and drop ${subject} here or click to select ${subject}`}
        className={clsx({
          "animate__animated animate__fast animate__pulse animate__infinite": dragging,
        })}
      />
      <input hidden type="file" multiple={multiple} accept={accept} ref={fileInputRef} onChange={handleChange} />
    </DropAreaBase>
  )
})

DropArea.displayName = "DropArea"

export default DropArea
