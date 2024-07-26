import { memo, useCallback, useState } from "react"
import { Button, Classes, Section, SectionCard } from "@blueprintjs/core"
import { useSetAtom } from "jotai"
import styled from "styled-components"
import Flex from "@react-css/flex"
import clsx from "clsx"
import { useProfilePicture } from "@/utils"
import { uploadProfilePicture as uploadPP } from "@/atoms"
import { Avatar, FileDrop } from "../base"

const SpacedButton = styled(Button)`
  margin-top: 10px;
`

SpacedButton.displayName = "SpacedButton"

const ProfileImage = memo(() => {
  const [isUploading, setIsUploading] = useState(false)
  const [isFileDropOpen, setIsFileDropOpen] = useState(false)
  const uploadProfilePicture = useSetAtom(uploadPP)
  const profilePicture = useProfilePicture()
  const loading = profilePicture == null
  const placeholder = profilePicture?.type === "placeholder"

  const uploadPicture = useCallback(async (fileList: FileList) => {
    const file = fileList.item(0)
    if (fileList.length === 1 && file) {
      setIsUploading(true)
      await uploadProfilePicture(file)
      setIsUploading(false)
      setIsFileDropOpen(false)
    }
  }, [])

  const openFileDrop = useCallback(() => setIsFileDropOpen(true), [])
  const closeFileDrop = useCallback(() => setIsFileDropOpen(false), [])

  return (
    <>
      <Section
        className={Classes.ELEVATION_1}
        title={
          <span className={clsx({ [Classes.SKELETON]: loading })}>
            Profile picture
          </span>
        }
        rightElement={
          <Button
            minimal
            className={clsx({ [Classes.SKELETON]: loading })}
            icon="upload"
            intent="primary"
            onClick={openFileDrop}
          >
            {placeholder ? "Add" : "Change"} profile picture
          </Button>
        }
      >
        <SectionCard>
          <Flex column alignItemsCenter>
            <Avatar
              $src={profilePicture?.url}
              className={clsx(Classes.ELEVATION_2, {
                [Classes.SKELETON]: loading,
              })}
            />
          </Flex>
        </SectionCard>
      </Section>
      <FileDrop
        accept="image/*"
        subject="profile picture"
        open={isFileDropOpen}
        uploading={isUploading}
        onClose={closeFileDrop}
        onSubmit={uploadPicture}
      />
    </>
  )
})

ProfileImage.displayName = "ProfileImage"

export default ProfileImage
