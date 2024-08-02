import request from "../request"
import {
  IAddPkgReq,
  IDelPkgReq,
  IEditPkgReq,
  IListAllPkgReq,
} from "../types/reqType"
import { IApiResp } from "../types/respType"

// 添加套餐 (管理员端：套餐管理页)
export const add = (param: IAddPkgReq): Promise<IApiResp> => {
  return request.post("/hcPackage/add", param)
}

// 这里传参有点问题，只能传字符串类型，后端要做处理
export const listAll = (param: IListAllPkgReq): Promise<IApiResp> => {
  const { gender, marriedLimit } = param
  const query = new URLSearchParams({})
  if (gender) query.append("gender", gender + "")
  if (marriedLimit) query.append("marriedLimit", marriedLimit + "")

  return request.get("/hcPackage/listAll?" + query.toString())
}

export const getDetail = (pkgId: string): Promise<IApiResp> => {
  const query = new URLSearchParams({ pkgId })
  return request.get("/hcPackage/getDetail?" + query.toString())
}

export const edit = (param: IEditPkgReq): Promise<IApiResp> => {
  return request.post("/hcPackage/edit", param)
}

export const del = (param: IDelPkgReq): Promise<IApiResp> => {
  return request.post("/hcPackage/del", param)
}
