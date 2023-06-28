import { useCallback, useEffect, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { StoreProvider } from "../../hooks/store"
import { listPros } from "../../service/api/project"
import { getUserInfo } from "../../service/api/user"
import { IProjectBaseinfo, IUser } from "../../type"
import Main from "../Main"
import UserProject from "../Main/UserProject"
import Home from "../Main/Home"
import Order from "../Main/Order"
import Other from "../Main/Other"
import Package from "../Main/Package"
import Project from "../Main/Project"
import Login from "../Login"

function App() {
  const [user, setUser] = useState<IUser | null>(null)
  const [projectMap, setProjectMap] = useState<IProjectBaseinfo[]>([])
  const [ws, setWs] = useState<WebSocket | null>(null)

  useEffect(() => {
    getUserInfo()
      .then((res) => setUser(res.data))
      .catch((err) => console.error(err))

    listPros()
      .then((res) => {
        const projectArr = res.data.map((item) => {
          const { _id, name } = item
          return { _id, name }
        })
        setProjectMap(projectArr)
      })
      .catch((err) => console.error(err))
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
        PubSub.publish("userParticipate", JSON.parse(reader.result as string))
    }

    setWs(webSocket)
  }, [])

  // 获取ws
  useEffect(() => {
    getWebSocket()
  }, [getWebSocket])

  return (
    <StoreProvider
      value={{ user, setUser, projectMap, setProjectMap, ws, setWs }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/main' element={<Main />}>
            <Route path='/main' element={<Navigate to='/main/home' />}></Route>
            <Route path='home' element={<Home />}></Route>
            <Route path='userProject' element={<UserProject />}></Route>
            <Route path='order' element={<Order />}></Route>
            <Route path='project' element={<Project />}></Route>
            <Route path='package' element={<Package />}></Route>
            <Route path='other' element={<Other />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  )
}

export default App
