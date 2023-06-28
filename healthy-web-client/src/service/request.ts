// axios的二次封装
import axios from "axios"

const request = axios.create({
  baseURL: "/api",
  timeout: 6000,
})

request.interceptors.request.use((req) => {
  // console.log("拦截了请求，可以设置loading等待框")
  return req
})

// 拦截响应，访问需要登录的页面需要处于登录状态，否则跳转登录页面
request.interceptors.response.use(
  (res) => {
    const { code } = res.data
    const { pathname } = window.location
    // 未登录访问登录页面，自动跳转登录页
    if (
      code === 10002 &&
      pathname !== "/" &&
      !pathname.startsWith("/wxLogin") &&
      pathname !== "/register"
    ) {
      window.location.href = "/"
    }
    // 登录访问未登录页面，自动跳转首页
    if (res.data.data && (pathname === "/" || pathname === "/register")) {
      window.location.href = "/main"
    }
    return res.data
  },
  (err) => Promise.reject(err)
)

export default request
