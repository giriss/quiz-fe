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
  const { id, name, created_at: createdAt } = await response.json()
  return returnWithToken({ id, name, createdAt: new Date(createdAt) }, response.headers.get("x-token")!)
}
