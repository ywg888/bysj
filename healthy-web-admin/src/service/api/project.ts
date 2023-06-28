import { IProject } from "../../type"
import request from "../request"
import { IAddProjectReq, IDelProjectReq, IEditProjectReq } from "../types/reqType"
import { IApiResp } from "../types/respType"

// 添加项目
export const add = (param: IAddProjectReq): Promise<IApiResp> => {
  return request.post("/project/add", param)
}

// 获取所有项目类型
export const listPros = (): Promise<IApiResp<IProject[]>> => {
  return request.get("/project/listPros")
}

// 编辑项目
export const edit = (param: IEditProjectReq): Promise<IApiResp> => {
  return request.post("/project/edit", param)
}

// 删除项目
export const del = (param: IDelProjectReq): Promise<IApiResp> => {
  return request.post("/project/del", param)
}
