import { IGender, IPackage, IProject } from "../../type"
export interface ILoginReq {
  code: string
}

export interface IRegesterReq {
  account: string
  id: string
}

export interface IGetUserInfoReq {
  account?: string
}

export interface IEditUser {
  nickname: string
  avatar: string
  banner: string
  introduce: string
}

// 用户模块
export interface IAdminLoginReq {
  account: string
  password: string
}

export interface IGetUserInfoReq {
  account?: string
}

export interface IEditUserReq {
  nickname: string
  avatar: string
  banner: string
  introduce: string
}

// 项目模块
export type IAddProjectReq = Omit<IProject, "_id">

export interface IEditProjectReq extends IAddProjectReq {
  proId: string
}

export interface IDelProjectReq {
  proId: string
}

// 套餐模块
export type IAddPkgReq = Omit<IPackage, "_id">

export interface IListAllPkgReq {
  gender?: IGender
  marriedLimit?: boolean
}

export interface IEditPkgReq extends IAddPkgReq {
  pkgId: string
}

export interface IGetPkgDetailReq {
  pkgId: string
}

// 用户项目模块
export interface IJoinReq {
  userProId: string
}

// 订单模块
export interface IAddOrderReq {
  pkgId: string
}

export interface IDelOrderReq {
  ordId: string
}
