import { atom } from "jotai"
import {
  deleteEmail,
  EmailCreate,
  EmailResponse,
  fetchEmails,
  patchPrimaryEmail,
  postEmail,
} from "@/api"
import { savedLoggedInToken } from "./account"

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
