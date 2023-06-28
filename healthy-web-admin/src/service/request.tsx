// axios的二次封装
import { message, Spin } from "antd"
import axios from "axios"
import "../assets/styles/request.scss"

const request = axios.create({
  baseURL: "/api",
  timeout: 6000,
})

let reqCount = 0

message.config({
  top: 0,
})
const addReq = () => {
  reqCount++
  if (reqCount === 1) {
    message.destroy()
    message.loading({
      content: "",
      icon: <Spin tip='Loading...' />,
      style: { padding: 0 },
      className: "loading",
    })
  }
}

const delReq = () => {
  reqCount--
  if (reqCount === 0) {
    message.destroy()
  }
}

request.interceptors.request.use((req) => {
  addReq()
  return req
})

// 拦截响应，访问需要登录的页面需要处于登录状态，否则跳转登录页面
request.interceptors.response.use(
  (res) => {
    delReq()
    // const { pathname } = window.location
    // if (res.data.code === 10002) {
    //   // 用户未登录
    //   message.info("用户未登录，跳转登录页面")
    //   window.location.href = "/login"
    // }
    // if (
    //   res.data.code === 0 &&
    //   (pathname === "/login" || pathname === "/register")
    // ) {
    //   message.info("用户未登录，跳转首页")
    //   window.location.href = "/main"
    // }
    return res.data
  },
  // 后续处理一下
  (err) => {
    delReq()
    return Promise.reject(err)
  }
)

export default request
