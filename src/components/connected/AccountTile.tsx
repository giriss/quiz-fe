import styled from "styled-components"
import { Cloudinary } from "@cloudinary/url-gen"
import { memo, useMemo } from "react"
import clsx from "clsx"
import { Classes } from "@blueprintjs/core"
import { thumbnail } from "@cloudinary/url-gen/actions/resize"
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity"
import { face } from "@cloudinary/url-gen/qualifiers/focusOn"
import placeholderAvatar from "@/assets/placeholder-avatar.png"
import Avatar from "../base/Avatar"

const AccountTileBase = styled.aside<{ $loading?: boolean }>`
  display: flex;
  padding: 10px;
  align-items: center;
  border-radius: 3px;

  ${({ $loading }) =>
    !$loading &&
    `&:hover {
      cursor: pointer;
      background-color: rgb(245, 245, 245);
    }`}

  > :last-child {
    padding-left: 10px;
    flex: 1;
  }
`

interface AccountTileProps {
  readonly id: string
  readonly username: string
  readonly pictureId?: string
  readonly loading?: boolean
}

const AccountTile = memo(function ({
  id,
  username,
  pictureId,
  loading = false,
}: AccountTileProps) {
  const pictureUrl = useMemo(() => {
    if (pictureId == null) {
      return placeholderAvatar
    }
    return new Cloudinary({
      cloud: { cloudName: "dpmcbdprq" },
      url: { secure: true },
    })
      .image(`${id}_${pictureId}`)
      .resize(thumbnail(64, 64).gravity(focusOn(face())).zoom(0.8))
      .toURL()
  }, [pictureId, id])

  return (
    <AccountTileBase $loading={loading}>
      <Avatar
        className={clsx({ [Classes.SKELETON]: loading })}
        $src={pictureUrl}
        $size={32}
      />
      <div>
        <span className={clsx({ [Classes.SKELETON]: loading })}>
          {username}
        </span>
      </div>
    </AccountTileBase>
  )
})

AccountTile.displayName = "AccountTile"

export default AccountTile
