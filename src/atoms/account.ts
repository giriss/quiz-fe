import { atom } from "jotai"
import { loadable } from "jotai/utils"
import {
  UserLogin,
  UserRegister,
  type UserResponse,
  login,
  me,
  register,
  postProfilePicture,
  getSearch,
} from "@/api"

export const loggedInToken = atom<string | undefined>(undefined)
export const savedLoggedInToken = atom<
  string | undefined,
  [string | undefined],
  void
>(
  get => {
    const token = get(loggedInToken)
    return token ?? localStorage.getItem("savedLoggedInToken") ?? undefined
  },
  (_get, set, token) => {
    if (token) {
      localStorage.setItem("savedLoggedInToken", token)
      set(loggedInToken, token)
    } else {
      localStorage.removeItem("savedLoggedInToken")
      set(loggedInToken, undefined)
    }
  },
)
export const loggedInAccount = atom<UserResponse | undefined>(undefined)
export const isLoggedIn = atom(get => !!get(savedLoggedInToken))
export const logout = atom(null, (_get, set) =>
  set(savedLoggedInToken, undefined),
)

export const postLogin = atom<null, [UserLogin], void>(
  null,
  async (_, set, payload) => {
    const [account, token] = await login(payload)
    set(savedLoggedInToken, token)
    set(loggedInAccount, account)
  },
)

export const postRegister = atom<null, [UserRegister], void>(
  null,
  async (_, set, payload) => {
    const [account, token] = await register(payload)
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

export const accountSearchTerm = atom("")

export const searchAccounts = loadable(
  atom(async (get, { signal }) => {
    const searchTerm = get(accountSearchTerm)

    if (searchTerm.length < 3) {
      return undefined
    }

    const token = get(savedLoggedInToken)!

    return await getSearch(searchTerm, token, signal).then(
      ([accounts]) => accounts,
    )
  }),
)

export const uploadProfilePicture = atom(null, async (get, set, file: File) => {
  const token = get(savedLoggedInToken)
  if (!token) {
    return undefined
  }
  const response = await postProfilePicture(file, token)
  if (!response) {
    return undefined
  }

  const [{ pictureId }, newToken] = response
  const account = get(loggedInAccount)!
  set(savedLoggedInToken, newToken)
  set(loggedInAccount, { ...account, pictureId })
})
