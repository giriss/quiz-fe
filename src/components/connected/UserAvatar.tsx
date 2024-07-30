import { ComponentPropsWithoutRef, memo } from "react"
import clsx from "clsx"
import { Classes } from "@blueprintjs/core"
import { useProfilePicture } from "@/utils"
import { Avatar } from "../base"

type UserAvatarProps = Omit<ComponentPropsWithoutRef<typeof Avatar>, "$src">

const UserAvatar = memo(
  ({ className = "", $size, ...props }: UserAvatarProps) => {
    const profilePicture = useProfilePicture($size ? $size * 2 : undefined)

    return (
      <Avatar
        {...props}
        $src={profilePicture?.url}
        $size={$size}
        className={clsx(className, {
          [Classes.SKELETON]: profilePicture == null,
        })}
      />
    )
  },
)

UserAvatar.displayName = "UserAvatar"

export default UserAvatar
