import { createContext } from "react"
import { IBaseInfo, IUser } from "../type"

interface StoreContext {
  user: IUser | null
  setUser: (user: IUser) => void
  baseInfo: IBaseInfo | null
  setBaseInfo: (baseInfo: IBaseInfo) => void
  ws: WebSocket | null
  setWs: (ws: WebSocket) => void
}

const context = createContext<StoreContext>({
  user: null,
  setUser: () => {},
  baseInfo: null,
  setBaseInfo: () => {},
  ws: null,
  setWs: () => {},
})

const StoreProvider = context.Provider

export { context, StoreProvider }
