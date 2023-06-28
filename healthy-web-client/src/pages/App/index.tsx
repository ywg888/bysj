import { useCallback, useEffect, useState } from "react"
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom"
import { StoreProvider } from "../../hooks/store"
import { IBaseInfo, IUser } from "../../type"
import Login from "../Login"
import Main from "../Main"
import HcPackage from "../Main/HcPackage"
import Register from "../Register"
import WxLogin from "../WxLogin"
import * as userService from "../../service/api/user"
import HealthCheckup from "../Main/HealthCheckup"
import Personal from "../Main/Personal"
import HcPackageDetail from "../Main/HcPackageDetail"
import MyOrder from "../MyOrder"
// import PubSub from "pubsub-js"

function App() {
  const [user, setUser] = useState<IUser | null>(null)
  const [baseInfo, setBaseInfo] = useState<IBaseInfo | null>(null)
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    const getUserInfo = async (account?: string) => {
      const { code, data } = await userService.getUserInfo({ account })
      if (code === 0) {
        setUser(data)
      }
    }
    getUserInfo()
  }, [])

  // 获取websocket
  const getWebSocket = useCallback(() => {
    const webSocket = new WebSocket("ws://127.0.0.1:9999")
    webSocket.onopen = () => {
      console.log("建立ws长连接")
    }

    // 断开连接（重连）
    webSocket.onclose = (e) => {
      setTimeout(() => {
        getWebSocket()
      }, 500)
    }

    // 收到消息
    webSocket.onmessage = (e) => {
      const reader = new FileReader()
      reader.readAsText(e.data, "UTF-8")
      reader.onload = () =>
        PubSub.publish("joinOrFinishPro", JSON.parse(reader.result as string))
    }

    setWs(webSocket)
  }, [])

  // 获取ws
  useEffect(() => {
    getWebSocket()
  }, [getWebSocket])

  return (
    <StoreProvider
      value={{
        user,
        setUser,
        baseInfo,
        setBaseInfo,
        ws,
        setWs,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />}></Route>
          <Route path='/wxLogin/:code' element={<WxLogin />}></Route>
          <Route path='/main' element={<Main />}>
            <Route path='/main' element={<Navigate to='/main/package' />} />
            <Route path='package' element={<HcPackage />} />
            <Route path='pkgDetail/:pkgId' element={<HcPackageDetail />} />
            <Route path='hc' element={<HealthCheckup />} />
            <Route path='me' element={<Personal />}></Route>
          </Route>
          <Route path='myOrder' element={<MyOrder />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
