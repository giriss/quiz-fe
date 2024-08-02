import { useAtom, useAtomValue } from "jotai"
import { useNavigate } from "react-router-dom"
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { thumbnail } from "@cloudinary/url-gen/actions/resize"
import { Cloudinary } from "@cloudinary/url-gen"
import { face } from "@cloudinary/url-gen/qualifiers/focusOn"
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity"
import { getLoggedInAccount, isLoggedIn } from "@/atoms"
import placeholderAvatar from "@/assets/placeholder-avatar.png"

export const useAuth = (whenSignedOut = false) => {
  const navigate = useNavigate()
  const loggedIn = useAtomValue(isLoggedIn)

  useEffect(() => {
    if (!whenSignedOut && !loggedIn && location.pathname !== "/") {
      navigate("/")
    }
    if (whenSignedOut && loggedIn && location.pathname !== "/dashboard") {
      navigate("/dashboard")
    }
  }, [loggedIn, navigate, whenSignedOut])
}

export const useAccount = () => {
  useAuth()

  const [account, getAccount] = useAtom(getLoggedInAccount)

  useEffect(() => {
    getAccount()
  }, [])

  return account
}

export const useDebounce = <T>(initial: T, delay: number) => {
  const [value, setValue] = useState(initial)
  const [delayedValue, setDelayedValue] = useState(initial)
  const setInstantValue: Dispatch<SetStateAction<T>> = useCallback(val => {
    setValue(val)
    setDelayedValue(val)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => setDelayedValue(value), delay)

    return () => clearTimeout(timeout)
  }, [value, delay])

  return [delayedValue, setValue, value, setInstantValue] as const
}

interface ProfilePicture {
  url: string
  type: "picture" | "placeholder"
}

export const useProfilePicture = (
  size: number = 200,
): ProfilePicture | undefined => {
  const account = useAccount()

  return useMemo(() => {
    if (account?.id) {
      if (account.pictureId) {
        const cloudinary = new Cloudinary({
          cloud: { cloudName: "dpmcbdprq" },
          url: { secure: true },
        })
        return {
          url: cloudinary
            .image(`${account.id}_${account.pictureId}`)
            .resize(thumbnail(size, size).gravity(focusOn(face())).zoom(0.8))
            .toURL(),
          type: "picture",
        }
      }
      return {
        url: placeholderAvatar,
        type: "placeholder",
      }
    }
  }, [account?.id, account?.pictureId, size])
}
