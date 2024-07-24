import { isPlainObject } from "lodash"
import { DateTime } from "luxon"
import { capitalize } from "@/utils/string"

export type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE"

export const withJsonBody = <T extends object>(
  json?: T,
  token?: string,
  method: HTTPMethod = "POST",
): RequestInit => ({
  method,
  body: JSON.stringify(json),
  headers: {
    ...(token ? { authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  },
  credentials: "include",
})

export const withoutBody = (
  token?: string,
  method: HTTPMethod = "GET",
): RequestInit => withJsonBody(undefined, token, method)

export const returnWithToken = <T, S>(returnVal: T, token: S): [T, S] => [
  returnVal,
  token,
]

const camelCase = (text: string) =>
  text.split("_").reduce((prev, curr) => `${prev}${capitalize(curr)}`)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const processResponse = (object: object): any =>
  Object.fromEntries(
    Object.entries(object).map(([key, value]) => [
      camelCase(key),
      isPlainObject(value)
        ? processResponse(value)
        : DateTime.fromISO(value).isValid
          ? DateTime.fromISO(value)
          : value,
    ]),
  )
