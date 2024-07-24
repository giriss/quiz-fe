import { atom } from "jotai"
import {
  ConnectionCreate,
  ConnectionResponse,
  fetchConnections,
  postConnection,
} from "@/api"
import { savedLoggedInToken } from "./account"

export const connections = atom<ConnectionResponse[] | undefined>(undefined)

export const getConnections = atom(
  get => get(connections),
  async (get, set) => {
    const token = get(savedLoggedInToken)
    if (!token) {
      return undefined
    }
    const [connectionsList, newToken] = await fetchConnections(token)
    set(savedLoggedInToken, newToken)
    set(connections, connectionsList)
  },
)

export const createConnection = atom(
  null,
  async (get, set, payload: ConnectionCreate) => {
    const token = get(savedLoggedInToken)
    if (!token) {
      return undefined
    }
    const [createdConnection, newToken] = await postConnection(payload, token)
    set(connections, [...(get(connections) ?? []), createdConnection])
    set(savedLoggedInToken, newToken)
  },
)
