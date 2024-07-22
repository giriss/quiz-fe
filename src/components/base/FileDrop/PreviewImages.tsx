import styled from "styled-components"
import { memo, useMemo } from "react"

const PreviewImage = styled.div<{ $url: string }>`
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  ${({ $url }) => `background-image: url(${$url});`}
`
PreviewImage.displayName = "PreviewImage"

const PreviewImageItem = styled(PreviewImage)`
  height: 100px;
  width: 100px;
`
PreviewImageItem.displayName = "PreviewImageItem"

interface PreviewImagesProps {
  readonly items: FileList
}

const PreviewImages = memo(({ items }: PreviewImagesProps) => {
  const imageUrls = useMemo(() => {
    const urls: string[] = []
    for (const image of items) {
      urls.push(URL.createObjectURL(image))
    }
    return urls
  }, [items])

  if (imageUrls.length === 1) {
    return <PreviewImage $url={imageUrls[0]} />
  }

  return (
    <>
      {imageUrls.map(url => (
        <PreviewImageItem key={url} $url={url} />
      ))}
    </>
  )
})

PreviewImages.displayName = "PreviewImages"

export default PreviewImages
