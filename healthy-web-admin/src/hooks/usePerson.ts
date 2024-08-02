import { useCallback, useContext } from "react"
import * as userService from "../service/api/user"
import { IAdminLoginReq, IRegisterReq } from "../service/types/reqType"
import { message } from "antd"
import { useNavigate } from "react-router-dom"
import { context } from "./store"

export default function usePerson() {
  const { user, setUser } = useContext(context)
  const navigate = useNavigate()

  // 获取用户信息
  const getUserInfo = useCallback(async () => {
    const { code, message: resMsg, data } = await userService.getUserInfo()
    if (code === 0) {
      setUser(data)
    } else {
      message.error(resMsg)
    }
  }, [setUser])

  const adminLogin = useCallback(
    async (params: IAdminLoginReq) => {
      const { code, message: resMsg } = await userService.adminLogin(params)
      if (code === 0) {
        await getUserInfo()
        message.success("登录成功")
        navigate("/main")
      } else {
        message.error(resMsg)
      }
    },
    [getUserInfo, navigate]
  )

  const adminRegist = useCallback(
    async (params: IRegisterReq) => {
      const { code, message: resMsg } = await userService.adminRegist(params)
      if (code === 0) {
        await getUserInfo()
        message.success("注册成功")
        navigate("/")
      } else {
        message.error(resMsg)
      }
    },
    [getUserInfo, navigate]
  )

  const logout = useCallback(async () => {
    const { code, message: resMsg } = await userService.logout()
    if (code === 0) {
      message.success("退出登录成功")
      navigate("/")
    } else {
      message.error(resMsg)
    }
  }, [navigate])

  return { user, adminLogin, logout, adminRegist }
}
