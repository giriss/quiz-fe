import { type ComponentProps, memo } from "react"
import styled from "styled-components"

const DropAreaBase = styled.aside<{ $uploading?: boolean }>`
  padding: 70px 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  ${({ $uploading }) => !$uploading && "cursor: pointer;"}
`

interface DropAreaProps extends ComponentProps<"aside"> {
  readonly uploading?: boolean
}

const DropArea = memo(({
  onClick,
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
  uploading = false,
  ...otherProps
}: DropAreaProps) => (
  <DropAreaBase
    $uploading={uploading}
    onClick={uploading ? undefined : onClick}
    onDrop={uploading ? undefined : onDrop}
    onDragEnter={uploading ? undefined : onDragEnter}
    onDragOver={uploading ? undefined : onDragOver}
    onDragLeave={uploading ? undefined : onDragLeave}
    {...otherProps}
  />
))

DropArea.displayName = "DropArea"

export default DropArea
