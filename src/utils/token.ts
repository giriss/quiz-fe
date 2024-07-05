import { useAtom, useAtomValue } from "jotai"
import { useNavigate, useNavigation } from "react-router-dom"
import { useEffect } from "react"
import { getLoggedInAccount, isLoggedIn } from "@/atoms"

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
    if (!account) {
      getAccount()
    }
  }, [account])

  return account
}
