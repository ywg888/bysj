import request from "../request"
import { IGetPkgDetailReq, IListAllPkgReq } from "../types/reqType"
import { IApiResp, IGetPkgDetailResp } from "../types/respType"

// 这里传参有点问题，只能传字符串类型，后端要做处理
export const listAll = (param: IListAllPkgReq): Promise<IApiResp> => {
  const { gender, marriedLimit } = param
  const query = new URLSearchParams({})
  if (gender) query.append("gender", gender + "")
  if (marriedLimit) query.append("marriedLimit", marriedLimit + "")

  return request.get("/hcPackage/listAll?" + query.toString())
}

export const getDetail = (
  param: IGetPkgDetailReq
): Promise<IApiResp<IGetPkgDetailResp>> => {
  const query = new URLSearchParams({ pkgId: param.pkgId })
  return request.get("/hcPackage/getDetail?" + query.toString())
}
