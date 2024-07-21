import { memo, useMemo } from "react"
import styled from "styled-components"
import { EntityTitle } from "@blueprintjs/core"
import { mimeTypeMatchesAccept } from "./utils"
import FileArea from "./FileArea"

const ImagePreview = styled(FileArea)<{ $url: string }>`
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  ${({ $url }) => `background-image: url(${$url});`}
`

ImagePreview.displayName = "ImagePreview"

interface FileListPreviewProps {
  readonly value: FileList
  readonly subject: string
}

const FileListPreview = memo(({ value, subject }: FileListPreviewProps) => {
  const imageUrl = useMemo(() => {
    if (value.length === 1 && mimeTypeMatchesAccept(value[0].type, "image/*")) {
      return URL.createObjectURL(value[0])
    }
  }, [value])

  if (imageUrl) {
    return <ImagePreview $url={imageUrl} />
  }

  return (
    <FileArea>
      <EntityTitle
        ellipsize
        icon="tick"
        title={`You have selected ${
          value?.length === 1 ? value.item(0)?.name : `${value?.length} ${subject}`
        }`}
      />
    </FileArea>

  )
})

FileListPreview.displayName = "FileListPreview"

export default FileListPreview
