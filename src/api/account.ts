import { REST_ENDPOINT } from "@/constants"
import { returnWithToken, withJsonBody, withoutBody } from "./utils"

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister extends UserLogin {
  name: string
}

export interface UserResponse {
  id: string
  name: string
  createdAt: Date
}

export interface EmailCreate {
  address: string
}

export interface EmailResponse extends EmailCreate {
  id: string
  verified: boolean
  primary: boolean
  createdAt: Date
}

export const login = async (params: UserLogin): Promise<[UserResponse, string | undefined]> => {
  const response = await fetch(`${REST_ENDPOINT}accounts/login`, withJsonBody(params))
  const { id, name, created_at: createdAt } = await response.json()
  return returnWithToken({ id, name, createdAt: new Date(createdAt) }, response.headers.get("x-token") ?? undefined)
}

export const register = async (params: UserRegister) => {
  const response = await fetch(`${REST_ENDPOINT}accounts/register`, withJsonBody(params))
  const { id, name, created_at: createdAt } = await response.json()
  return returnWithToken({ id, name, createdAt: new Date(createdAt) }, response.headers.get("x-token") ?? undefined)
}

export const me = async (token: string): Promise<[UserResponse, string]> => {
  const response = await fetch(`${REST_ENDPOINT}accounts/me`, withoutBody(token))
  const { created_at: createdAt, ...others } = await response.json()
  return returnWithToken({ createdAt: new Date(createdAt), ...others }, response.headers.get("x-token")!)
}

export const fetchEmails = async (token: string): Promise<[EmailResponse[], string]> => {
  const response = await fetch(`${REST_ENDPOINT}accounts/emails`, withoutBody(token))
  const emailsList: any[] = await response.json()
  return returnWithToken(
    emailsList.map(({ created_at: createdAt, ...others }) => ({ createdAt, ...others })),
    response.headers.get("x-token")!
  )
}

export const postEmail = async (params: EmailCreate, token: string): Promise<[EmailResponse, string]> => {
  const response = await fetch(`${REST_ENDPOINT}accounts/emails`, withJsonBody(params, token))
  const { created_at: createdAt, ...others } = await response.json()
  return returnWithToken({ createdAt, ...others }, response.headers.get("x-token")!)
}

export const deleteEmail = async (id: string, token: string): Promise<string> => {
  const response = await fetch(`${REST_ENDPOINT}accounts/emails/${id}`, withoutBody(token, "DELETE"))
  return response.headers.get("x-token")!
}

export const patchPrimaryEmail = async (id: string, token: string): Promise<string> => {
  const response = await fetch(`${REST_ENDPOINT}accounts/emails/${id}/primary`, withoutBody(token, "PATCH"))
  return response.headers.get("x-token")!
}
