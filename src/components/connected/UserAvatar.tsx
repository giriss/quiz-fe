import { ComponentPropsWithoutRef, memo } from "react"
import clsx from "clsx"
import { Classes } from "@blueprintjs/core"
import { useProfilePicture } from "@/utils"
import { Avatar } from "../base"

type UserAvatarProps = Omit<ComponentPropsWithoutRef<typeof Avatar>, "$src">

const UserAvatar = memo(({ className = "", ...props }: UserAvatarProps) => {
  const profilePicture = useProfilePicture()

  return (
    <Avatar
      {...props}
      $src={profilePicture?.url}
      className={clsx(className, {
        [Classes.SKELETON]: profilePicture == null,
      })}
    />
  )
})

UserAvatar.displayName = "UserAvatar"

export default UserAvatar
