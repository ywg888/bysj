import { createContext } from "react"
import {  IProjectBaseinfo, IUser } from "../type"

interface StoreContext {
  user: IUser | null
  setUser: (user: IUser) => void
  // 系统启动就存储所有项目基本信息
  projectMap: IProjectBaseinfo[]
  setProjectMap: (projects: IProjectBaseinfo[]) => void
  ws: WebSocket | null
  setWs: (ws: WebSocket) => void
}

const context = createContext<StoreContext>({
  user: null,
  setUser: () => {},
  projectMap: [],
  setProjectMap: () => {},
  ws: null,
  setWs: () => {},
})

const StoreProvider = context.Provider

export { context, StoreProvider }
