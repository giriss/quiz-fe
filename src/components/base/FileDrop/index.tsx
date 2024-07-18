import { Button, Colors, Dialog, DialogBody, DialogFooter, EntityTitle } from "@blueprintjs/core"
import { ChangeEventHandler, DragEventHandler, memo, useCallback, useEffect, useMemo, useRef, useState, type FC } from "react"
import styled from "styled-components"
import { Cross } from "@blueprintjs/icons"
import clsx from "clsx"
import { mimeTypeMatchesAccept } from "./utils"
import DropArea from "./DropArea"
import Ellipsis from "./Ellipsis"

const CompactDialogBody = styled(DialogBody)`
  padding: 0;
`

interface FileDropProps {
  onSubmit: (fileList: FileList) => void
  subject?: string
  accept?: string
  open?: boolean
  multiple?: boolean
  uploading?: boolean
  onClose?: VoidFunction
}

const FileDrop: FC<FileDropProps> = memo(({
  onSubmit,
  onClose,
  accept,
  subject = "files",
  open = false,
  multiple = false,
  uploading = false,
}) => {
  const [dragging, setDragging] = useState(false)
  const [fileList, setFileList] = useState<FileList>()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const errors = useMemo(() => {
    if (!fileList || fileList.length === 0) {
      return ''
    }
    if (fileList.length > 1 && !multiple) {
      return 'Only 1 file can be selected'
    }
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList.item(i)
      if (!mimeTypeMatchesAccept(file?.type ?? "", accept)) {
        return 'File type not accepted'
      }
    }
  }, [fileList, multiple, accept])
  const isValid = useMemo(() => errors == null, [errors])

  const handleClick = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }, [])
  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(event => {
    setFileList(event.currentTarget.files ?? undefined)
  }, [])
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
      setFileList(event.dataTransfer.files)
    }
  }, [])
  const handleSubmit = useCallback(() => {
    if (fileList && fileList.length > 0) {
      onSubmit(fileList)
    }
  }, [onSubmit, fileList])

  useEffect(() => {
    if (open) {
      setDragging(false)
      setFileList(undefined)
    }
  }, [open])

  return (
    <Dialog isOpen={open} title={`Upload ${subject}`} icon="upload" onClose={uploading ? undefined : onClose}>
      <CompactDialogBody>
        <DropArea
          uploading={uploading}
          onClick={handleClick}
          onDrop={handleDrop}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDragLeave}
        >
          <EntityTitle
            ellipsize
            className={clsx({
              "animate__animated animate__fast animate__pulse animate__infinite": dragging,
            })}
            icon={isValid ? (uploading ? "cloud-upload" : "tick") : "document"}
            title={isValid ? (
              uploading ? <>Uploading {subject}<Ellipsis delay={400} /></> : (
                `You have selected ${
                  fileList?.length === 1 ? fileList.item(0)?.name : `${fileList?.length} ${subject}`
                }`
              )
            ) : (
              `Drag and drop ${subject} here or click to select ${subject}`
            )}
          />
          <input hidden type="file" multiple={multiple} accept={accept} onChange={handleChange} ref={fileInputRef} />
        </DropArea>
      </CompactDialogBody>
      <DialogFooter
        actions={[
          <Button key={0} text="Close" disabled={uploading} onClick={onClose} />,
          <Button key={1} text="Upload" intent="primary" disabled={!isValid || uploading} onClick={handleSubmit} />,
        ]}
      >
        {errors && (
          <span style={{ color: Colors.RED3 }}><Cross /> {errors}</span>
        )}
      </DialogFooter>
    </Dialog>
  )
})

FileDrop.displayName = "FileDrop"

export default FileDrop
