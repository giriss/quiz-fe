import { memo, useMemo } from "react"
import { EntityTitle } from "@blueprintjs/core"
import { mimeTypeMatchesAccept } from "./utils"
import FileArea from "./FileArea"
import PreviewImages from "./PreviewImages"

interface FileListPreviewProps {
  readonly value: FileList
  readonly subject: string
}

const FileListPreview = memo(({ value, subject }: FileListPreviewProps) => {
  const fileType = useMemo(() => {
    const types: string[] = []
    for (const file of value) {
      types.push(file.type)
    }
    if (
      types.reduce(
        (prev, curr) => prev && mimeTypeMatchesAccept(curr, "image/*"),
        true,
      )
    ) {
      return "image"
    }
    return "other"
  }, [value])

  return (
    <FileArea wrap>
      {fileType === "image" && <PreviewImages items={value} />}
      {fileType === "other" && (
        <EntityTitle
          ellipsize
          icon="tick"
          title={`You have selected ${
            value?.length === 1
              ? value.item(0)?.name
              : `${value?.length} ${subject}`
          }`}
        />
      )}
    </FileArea>
  )
})

FileListPreview.displayName = "FileListPreview"

export default FileListPreview
