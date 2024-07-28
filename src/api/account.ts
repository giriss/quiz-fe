import { DateTime } from "luxon"
import { REST_ENDPOINT } from "@/constants"
import {
  processResponse,
  returnWithToken,
  withJsonBody,
  withoutBody,
} from "./utils"

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister extends UserLogin {
  name: string
}

export interface UserSearchItem {
  id: string
  name: string
  pictureId?: string
}

export interface UserResponse extends UserSearchItem {
  createdAt: DateTime
}

export const login = async (
  params: UserLogin,
): Promise<[UserResponse, string | undefined]> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/login`,
    withJsonBody(params),
  )

  return returnWithToken(
    processResponse(await response.json()),
    response.headers.get("x-token") ?? undefined,
  )
}

export const register = async (params: UserRegister) => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/register`,
    withJsonBody(params),
  )

  return returnWithToken(
    processResponse(await response.json()),
    response.headers.get("x-token") ?? undefined,
  )
}

export const me = async (token: string): Promise<[UserResponse, string]> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/me`,
    withoutBody(token),
  )

  return returnWithToken(
    processResponse(await response.json()),
    response.headers.get("x-token")!,
  )
}

export const getSearch = async (
  query: string,
  token: string,
  signal?: AbortSignal,
): Promise<[UserSearchItem[], string]> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/search/${encodeURIComponent(query)}`,
    { ...withoutBody(token), signal },
  )

  return returnWithToken(
    await response.json().then((data: never[]) => data.map(processResponse)),
    response.headers.get("x-token")!,
  )
}

export const postProfilePicture = async (
  file: File,
  token: string,
): Promise<[{ pictureId: string; accountId: string }, string] | undefined> => {
  const response = await fetch(
    `${REST_ENDPOINT}accounts/picture`,
    withoutBody(token),
  )
  if (response.status === 200) {
    const newToken = response.headers.get("x-token")!
    const {
      signature,
      timestamp,
      api_key: apiKey,
      public_id: publicId,
      cloud_name: cloudName,
    } = await response.json()
    const formData = new FormData()
    formData.append("file", file)
    formData.append("signature", signature)
    formData.append("timestamp", timestamp)
    formData.append("public_id", publicId)
    formData.append("api_key", apiKey)
    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: formData },
    )
    if (cloudinaryResponse.status === 200) {
      const body = await cloudinaryResponse.json()
      const [accountId, pictureId] = body["public_id"].split("_")
      return returnWithToken({ accountId, pictureId }, newToken)
    }
  }
}
