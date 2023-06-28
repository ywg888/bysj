import request from "../request"
import { IJoinReq } from "../types/reqType"
import { IApiResp, IListQueueProsResp } from "../types/respType"

// 获取某类排队项目 (管理员端：体检管理页面)
export const listQueuePros = (name: string): Promise<IApiResp<IListQueueProsResp[]>> => {
  const query = new URLSearchParams({ name })
  return request.get("/userProject/listQueuePros?" + query.toString())
}

// 获取用户订购套餐中的所有项目以及排队情况 (客户端：主业务，查看体检排队人数的时候使用)
// 这里前端需要动态更新数据，采用websocket技术，客户端和服务端建立长连接，动态选择排队的项目之后，服务端就要及时通知
// 前端要搭配节流使用，防止高频率更换状态
export const listUserPros = (): Promise<IApiResp> => {
  return request.get("/userProject/listUserPros")
}

// 参与排队
export const join = (param: IJoinReq): Promise<IApiResp> => {
  return request.post("/userProject/join", param)
}

// 确认完成
export const finish = (param: IJoinReq): Promise<IApiResp> => {
  return request.post("/userProject/finish", param)
}
