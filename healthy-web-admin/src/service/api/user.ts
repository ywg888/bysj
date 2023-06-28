import { IUser } from "../../type"
import request from "../request"
import { IAdminLoginReq } from "../types/reqType"
import { IApiResp } from "../types/respType"

// 管理员登录
export const adminLogin = (param: IAdminLoginReq): Promise<IApiResp> => {
  return request.post("/user/adminLogin", param)
}

// 管理员注册 (后期待改)
// export const register = (param: IRegesterReq): Promise<IApiResp> => {
//   return request.post("/user/register", param)
// }

// 退出登录
export const logout = (): Promise<IApiResp> => {
  return request.post("/user/logout")
}

// 获取用户信息
export const getUserInfo = (): Promise<IApiResp<IUser>> => {
  return request.get("/user/getUserInfo")
}

// 编辑当前用户的信息 (有时间做)
// export const editUser = (param: IEditUserReq): Promise<IApiResp> => {
//   return request.post("/user/editUser", param)
// }
