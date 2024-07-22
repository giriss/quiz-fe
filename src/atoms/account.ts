import { atom } from "jotai"
import {
  UserLogin,
  UserRegister,
  type UserResponse,
  login,
  me,
  register,
  EmailResponse,
  fetchEmails,
  postEmail,
  EmailCreate,
  deleteEmail,
  patchPrimaryEmail,
  postProfilePicture,
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

export const acccountEmails = atom<EmailResponse[] | undefined>(undefined)

export const getEmails = atom(
  get => get(acccountEmails),
  async (get, set) => {
    const token = get(savedLoggedInToken)
    if (!token) {
      return undefined
    }
    const [accEmails, newToken] = await fetchEmails(token)
    set(savedLoggedInToken, newToken)
    set(acccountEmails, accEmails)
  },
)

export const createEmail = atom(
  null,
  async (get, set, payload: EmailCreate) => {
    const token = get(savedLoggedInToken)
    if (!token) {
      return undefined
    }
    const [createdEmail, newToken] = await postEmail(payload, token)
    set(acccountEmails, [...(get(acccountEmails) ?? []), createdEmail])
    set(savedLoggedInToken, newToken)
  },
)

export const removeEmail = atom(null, async (get, set, address: string) => {
  const token = get(savedLoggedInToken)
  if (!token) {
    return undefined
  }
  const newToken = await deleteEmail(address, token)
  set(
    acccountEmails,
    get(acccountEmails)?.filter(email => email.address !== address),
  )
  set(savedLoggedInToken, newToken)
})

export const makePrimaryEmail = atom(
  null,
  async (get, set, address: string) => {
    const token = get(savedLoggedInToken)
    if (!token) {
      return undefined
    }
    const newToken = await patchPrimaryEmail(address, token)
    set(savedLoggedInToken, newToken)
    set(
      acccountEmails,
      get(acccountEmails)!.reduce((memo, email) => {
        if (email.primary) {
          return [...memo, { ...email, primary: false }]
        }
        if (email.address === address) {
          return [...memo, { ...email, primary: true }]
        }
        return [...memo, email]
      }, Array<EmailResponse>()),
    )
  },
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
