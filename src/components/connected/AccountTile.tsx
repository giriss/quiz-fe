import styled from "styled-components"
import { Cloudinary } from "@cloudinary/url-gen"
import { memo, useMemo } from "react"
import { thumbnail } from "@cloudinary/url-gen/actions/resize"
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity"
import { face } from "@cloudinary/url-gen/qualifiers/focusOn"
import placeholderAvatar from "@/assets/placeholder-avatar.png"
import Avatar from "../base/Avatar"

const AccountTileBase = styled.aside`
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
    background-color: rgb(245, 245, 245);
  }

  :last-child {
    padding-left: 10px;
    flex: 1;
  }
`

interface AccountTileProps {
  readonly id: string
  readonly name: string
  readonly pictureId?: string
}

const AccountTile = memo(({ id, name, pictureId }: AccountTileProps) => {
  const pictureUrl = useMemo(() => {
    if (pictureId == null) {
      return placeholderAvatar
    }
    return new Cloudinary({
      cloud: { cloudName: "dpmcbdprq" },
      url: { secure: true },
    })
      .image(`${id}_${pictureId}`)
      .resize(thumbnail(200, 200).gravity(focusOn(face())).zoom(0.8))
      .toURL()
  }, [pictureId, id])

  return (
    <AccountTileBase>
      <Avatar $src={pictureUrl} $size="32px" />
      <div>{name}</div>
    </AccountTileBase>
  )
})

AccountTile.displayName = "AccountTile"

export default AccountTile
