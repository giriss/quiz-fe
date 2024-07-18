import { FC, memo, useCallback, useMemo, useState } from "react"
import { Button, Card, Classes, H6 } from "@blueprintjs/core"
import { useAtomValue, useSetAtom } from "jotai"
import styled from "styled-components"
import Flex from "@react-css/flex"
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { loggedInToken, uploadProfilePicture } from "@/atoms"
import { useAccount } from "@/utils"
import placeholderAvatar from "@/assets/placeholder-avatar.png"
import { FileDrop } from "../base"

const Avatar = styled.div<{ $src: string; $size?: string }>`
  width: ${({ $size }) => $size ?? "150px"};
  height: ${({ $size }) => $size ?? "150px"};
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-image: url(${({ $src }) => $src});
`

Avatar.displayName = "Avatar"

const SpacedButton = styled(Button)`
  margin-top: 10px;
`

SpacedButton.displayName = "SpacedButton"

const ProfileImage: FC = memo(() => {
  const cloudinary = new Cloudinary({ cloud: { cloudName: "dpmcbdprq" }, url: { secure: true } })
  const [isUploading, setIsUploading] = useState(false)
  const [isFileDropOpen, setIsFileDropOpen] = useState(false)
  const uploadPP = useSetAtom(uploadProfilePicture)
  const authorization = `Bearer ${useAtomValue(loggedInToken)}`
  const account = useAccount()
  const profilePicture = useMemo(() => {
    if (!account || !account.pictureId) {
      return
    }

    return cloudinary
      .image(`${account.id}_${account.pictureId}`)
      .resize(thumbnail(200, 200).gravity(focusOn(face())).zoom(.85))
      .toURL()
  }, [account?.id, account?.pictureId])
  const uploadPicture = useCallback(async (fileList: FileList) => {
    const file = fileList.item(0)
    if (fileList.length ===  1 && file) {
      setIsUploading(true)
      await uploadPP(file)
      setIsUploading(false)
      setIsFileDropOpen(false)
    }
  }, [authorization])

  const openFileDrop = useCallback(() => setIsFileDropOpen(true), [])
  const closeFileDrop = useCallback(() => setIsFileDropOpen(false), [])

  return (
    <Card>
      <H6>Profile Picture</H6>
      <Flex column alignItemsCenter>
        <Avatar
          className={Classes.ELEVATION_2}
          $src={profilePicture ?? placeholderAvatar}
        />
        <SpacedButton intent="primary" onClick={openFileDrop}>
          {profilePicture ? "Replace" : "Upload"} profile picture
        </SpacedButton>
      </Flex>
      <FileDrop
        accept="image/*"
        subject="profile picture"
        open={isFileDropOpen}
        uploading={isUploading}
        onClose={closeFileDrop}
        onSubmit={uploadPicture}
      />
    </Card>
  )
})

ProfileImage.displayName = "ProfileImage"

export default ProfileImage
