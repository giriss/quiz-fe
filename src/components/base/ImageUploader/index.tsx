import { Button, Callout, FileInput } from "@blueprintjs/core"
import { type FC, type FormEventHandler, memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"

const SpacedFileInput = styled(FileInput)`
  margin: 10px 0;
`

interface ImageUploaderProps {
  disabled?: boolean
  onUpload: (selectedFile: File) => void
}

const ImageUploader: FC<ImageUploaderProps> = memo(({ disabled, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File>()
  const hasSelection = useMemo(() => Boolean(selectedFile), [Boolean(selectedFile)])

  const handleImageSelect: FormEventHandler<HTMLInputElement> = useCallback(event => {
    setSelectedFile(event.currentTarget.files?.item(0) ?? undefined)
  }, [])
  const handleUpload = useCallback(() => {
    onUpload(selectedFile!)
  }, [onUpload, selectedFile])

  return (
    <Callout title="Update profile picture">
      <SpacedFileInput
        fill
        disabled={disabled}
        text={hasSelection ? selectedFile!.name : "Select image"}
        hasSelection={hasSelection}
        inputProps={useMemo(() => ({ accept: "image/*" }), [])}
        onInputChange={handleImageSelect}
      />
      <Button
        icon="upload"
        disabled={disabled || !hasSelection}
        onClick={handleUpload}
      >
        Upload
      </Button>
    </Callout>
  )
})

ImageUploader.displayName = "ImageUploader"

export default ImageUploader
