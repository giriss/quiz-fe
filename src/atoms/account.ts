import { atom } from "jotai"
import { type UserResponse, login, me } from "@/api"

export const loggedInToken = atom<string | undefined>(undefined)
export const loggedInAccount = atom<UserResponse | undefined>(undefined)
export const savedLoggedInToken = atom<string | undefined, [string | undefined], void>(
  get => {
    const token = get(loggedInToken)
    return token ?? localStorage.getItem('savedLoggedInToken') ?? undefined
  },
  (_get, set, token) => {
    if (token) {
      localStorage.setItem('savedLoggedInToken', token)
      set(loggedInToken, token)
    } else {
      localStorage.removeItem('savedLoggedInToken')
      set(loggedInToken, undefined)
    }
  }
)
export const isLoggedIn = atom(get => !!get(savedLoggedInToken))
export const logout = atom(null, (_get, set) => set(savedLoggedInToken, undefined))

export const postLogin = atom<null, [{ email: string, password: string }], void>(
  null,
  async (_, set, payload) => {
    const [account, token] = await login(payload)
    set(savedLoggedInToken, token)
    set(loggedInAccount, account)
  },
)

export const getLoggedInAccount = atom(
  get => get(loggedInAccount),
  async (get, set) => {
    const token = get(savedLoggedInToken)
    if (!token) {
      return undefined
    }
    const [account, newToken] = await me(token)
    set(savedLoggedInToken, newToken)
    set(loggedInAccount, account)
  },
)
