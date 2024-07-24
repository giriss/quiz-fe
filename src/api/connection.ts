import { DateTime } from "luxon"
import { REST_ENDPOINT } from "@/constants"
import {
  processResponse,
  returnWithToken,
  withJsonBody,
  withoutBody,
} from "./utils"
import { UserResponse } from "./account"

export interface ConnectionCreate {
  responder_id: string
}

export interface ConnectionResponse {
  status: number
  createdAt: DateTime
  requester: Omit<UserResponse, "createdAt">
  responder: Omit<UserResponse, "createdAt">
}

export const fetchConnections = async (
  token: string,
): Promise<[ConnectionResponse[], string]> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/connections`,
    withoutBody(token),
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const connectionsList: any[] = await response.json()
  return returnWithToken(
    connectionsList.map(processResponse),
    response.headers.get("x-token")!,
  )
}

export const postConnection = async (
  params: ConnectionCreate,
  token: string,
): Promise<[ConnectionResponse, string]> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/emails`,
    withJsonBody(params, token),
  )

  return returnWithToken(
    processResponse(await response.json()),
    response.headers.get("x-token")!,
  )
}
