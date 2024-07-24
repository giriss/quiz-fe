import { DateTime } from "luxon"
import { REST_ENDPOINT } from "@/constants"
import {
  processResponse,
  returnWithToken,
  withJsonBody,
  withoutBody,
} from "./utils"

export interface EmailCreate {
  address: string
}

export interface EmailResponse extends EmailCreate {
  verified: boolean
  primary: boolean
  createdAt: DateTime
}

export const fetchEmails = async (
  token: string,
): Promise<[EmailResponse[], string]> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/emails`,
    withoutBody(token),
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const emailsList: any[] = await response.json()

  return returnWithToken(
    emailsList.map(processResponse),
    response.headers.get("x-token")!,
  )
}

export const postEmail = async (
  params: EmailCreate,
  token: string,
): Promise<[EmailResponse, string]> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/emails`,
    withJsonBody(params, token),
  )

  return returnWithToken(
    processResponse(await response.json()),
    response.headers.get("x-token")!,
  )
}

export const deleteEmail = async (
  address: string,
  token: string,
): Promise<string> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/emails/${encodeURIComponent(address)}`,
    withoutBody(token, "DELETE"),
  )
  return response.headers.get("x-token")!
}

export const patchPrimaryEmail = async (
  address: string,
  token: string,
): Promise<string> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/emails/${encodeURIComponent(address)}/primary`,
    withoutBody(token, "PATCH"),
  )
  return response.headers.get("x-token")!
}
