import { IQueuedPro } from "../../type"
import { IAddPkgReq } from "./reqType"

export interface IApiResp<T = any> {
  code: number
  message: string
  data: T
}

export interface IUserTestResp {
  name: string
  age: number
}

// 未完成
export interface IListOrdersResp {
  _id: string
  isDone: boolean
  createdAt: number
  endAt: number
  account: string
  name: string
}

export interface IListQueueProsResp {
  _id: string
  account: string
  joinAt: number
}

export interface IProIntroduceItem {
  name: string
  introduce: string
}

export interface IGetPkgDetailResp {
  pkgInfo: IAddPkgReq
  proItems: IProIntroduceItem[]
}

export interface IListUserProsResp {
  pkgName: string
  queuedPros: IQueuedPro[]
}
