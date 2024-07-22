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
