import { Toast } from "antd-mobile"
import { useCallback, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as userService from "../service/api/user"
import { context } from "./store"

export default function usePerson() {
  // 这里存的是有关用户的所有逻辑
  const { user, setUser, baseInfo, setBaseInfo } = useContext(context)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  // 获取用户信息
  const getUserInfo = useCallback(
    async (account?: string) => {
      const res = await userService.getUserInfo({ account })
      if (res.code === 0) {
        setUser(res.data)
      } else {
        Toast.show({
          content: res.message,
        })
      }
    },
    [setUser]
  )

  // 登录
  const login = useCallback(
    async (code: string) => {
      try {
        setLoading(true)
        const res = await userService.login({ code })
        if (res.code === 0) {
          await getUserInfo()
          navigate("/main")
          Toast.show('登录成功')
        } else if (res.code === 1) {
          setBaseInfo(res.data)
          navigate("/register")
        } else {
          Toast.show({
            content: res.message,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [navigate, setBaseInfo, getUserInfo]
  )

  // 注册
  const register = useCallback(
    async (account: string, id: string) => {
      try {
        setLoading(true)
        const res = await userService.register({ account, id })
        if (res.code === 0) {
          await getUserInfo()
          Toast.show({
            content: "恭喜注册成功",
          })
          navigate("/main")
        } else {
          Toast.show({
            content: res.message,
          })
        }
      } finally {
        setLoading(false)
      }
    },
    [navigate, getUserInfo]
  )

  // 退出登录
  const logout = useCallback(async () => {
    try {
      setLoading(true)
      const res = await userService.logout()
      if (res.code === 0) {
        Toast.show({
          content: "退出成功",
        })
        navigate("/")
      } else {
        Toast.show({
          content: res.message,
        })
      }
    } finally {
      setLoading(false)
    }
  }, [navigate])

  // 编辑用户信息
  const editUser = useCallback(
    async (
      nickname: string,
      avatar: string,
      banner: string,
      introduce: string
    ) => {
      try {
        const res = await userService.editUser({
          nickname,
          avatar,
          banner,
          introduce,
        })
        if (res.code === 0) {
          Toast.show({ content: "编辑成功" })
          navigate("/main")
        } else {
          Toast.show({ content: "编辑失败" })
        }
      } finally {
        setLoading(false)
      }
    },
    [navigate]
  )

  return {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    getUserInfo,
    editUser,
    baseInfo,
  }
}
