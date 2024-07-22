import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { Button, Colors, Dialog, DialogFooter, EntityTitle, DialogBody } from "@blueprintjs/core"
import { Cross } from "@blueprintjs/icons"
import styled from "styled-components"
import { capitalize } from "./utils"
import DropArea from "./DropArea"
import FileArea from "./FileArea"
import Ellipsis from "./Ellipsis"
import FileListPreview from "./FileListPreview"

export interface FileDropProps {
  readonly onSubmit: (fileList: FileList) => void
  readonly subject?: string
  readonly accept?: HTMLInputElement["accept"]
  readonly open?: boolean
  readonly multiple?: HTMLInputElement["multiple"]
  readonly uploading?: boolean
  readonly onClose?: VoidFunction
}

const FileDrop = memo(({
  onSubmit,
  onClose,
  accept,
  subject = "files",
  open = false,
  multiple = false,
  uploading = false,
}: FileDropProps) => {
  const [fileList, setFileList] = useState<FileList>()
  const [errors, setErrors] = useState<string[]>([])

  const valid = useMemo(() => !!fileList && errors.length === 0, [errors])

  const handleSubmit = useCallback(() => {
    if (fileList && fileList.length > 0) {
      onSubmit(fileList)
    }
  }, [onSubmit, fileList])
  const handleFileList = useCallback((fileList: FileList) => {
    setFileList(fileList)
    setErrors([])
  }, [])
  const handleErrors = useCallback((errors: string[]) => {
    setFileList(undefined)
    setErrors(errors)
  }, [])

  useEffect(() => {
    if (open) {
      setFileList(undefined)
      setErrors([])
    }
  }, [open])

  return (
    <Dialog isOpen={open} title={`Upload ${subject}`} icon="upload" onClose={uploading ? undefined : onClose}>
      <CompactDialogBody>
        {valid ? (
          uploading ? (
            <FileArea>
              <EntityTitle
                ellipsize
                icon="cloud-upload"
                title={(
                  <>
                    {`Uploading ${subject}`}
                    <Ellipsis delay={400} />
                  </>
                )}
              />
            </FileArea>
          ) : (
            <FileListPreview subject={subject} value={fileList!} />
          )
        ) : (
          <DropArea
            accept={accept}
            subject={subject}
            multiple={multiple}
            onFileList={handleFileList}
            onErrors={handleErrors}
          />
        )}
      </CompactDialogBody>
      <DialogFooter
        actions={[
          <Button key={0} text="Close" disabled={uploading} onClick={onClose} />,
          <Button key={1} text="Upload" intent="primary" disabled={!valid || uploading} onClick={handleSubmit} />,
        ]}
      >
        {errors.length > 0 && (
          <ErrorMessage><Cross /> {capitalize(errors.join(' & '))}</ErrorMessage>
        )}
      </DialogFooter>
    </Dialog>
  )
})

FileDrop.displayName = "FileDrop"

export default FileDrop

const CompactDialogBody = styled(DialogBody)`
  padding: 0;
`
CompactDialogBody.displayName = "CompactDialogBody"

const ErrorMessage = styled.span`
  color: ${Colors.RED3};
`
ErrorMessage.displayName = "ErrorMessage"
