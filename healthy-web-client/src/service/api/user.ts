import { IUser } from "../../type"
import request from "../request"
import {
  IEditUser,
  IGetUserInfoReq,
  ILoginReq,
  IRegesterReq,
} from "../types/reqType"
import { IApiResp, IUserTestResp } from "../types/respType"

export const testApi = (): Promise<IApiResp<IUserTestResp>> => {
  return request.get("/user/info")
}

// 登录
export const login = (param: ILoginReq): Promise<IApiResp> => {
  return request.post("/user/login", param)
}

// 注册
export const register = (param: IRegesterReq): Promise<IApiResp> => {
  return request.post("/user/register", param)
}

// 退出登录
export const logout = (): Promise<IApiResp> => {
  return request.post("/user/logout")
}

// 获取用户信息
export const getUserInfo = (param: IGetUserInfoReq): Promise<IApiResp<IUser>> => {
  const query = new URLSearchParams({})
  if (param.account) query.append("account", param.account)
  return request.get("/user/getUserInfo?" + query.toString())
}

// 编辑当前用户的信息
export const editUser = (param: IEditUser): Promise<IApiResp> => {
  return request.post("/user/editUser", param)
}
