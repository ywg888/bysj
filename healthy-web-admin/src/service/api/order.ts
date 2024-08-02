import request from "../request"
import { IAddOrderReq, IDelOrderReq } from "../types/reqType"
import { IApiResp, IListOrdersResp } from "../types/respType"

// 添加 (客户端：首页/套餐详情页)
export const add = (param: IAddOrderReq): Promise<IApiResp> => {
  return request.post("/order/add", param)
}

// 获取所有订单信息：用户名，套餐名，下订时间，完成时间，是否完成 (管理员端：订单管理页)
export const listOrders = (): Promise<IApiResp<IListOrdersResp[]>> => {
  return request.get("/order/listOrders")
}

// 获取用户的所有订单 (客户端：个人/我的订单)
export const listUserOrders = (): Promise<IApiResp> => {
  return request.get("/order/listUserOrders")
}

// 删除订单 (用户端，管理员端：都可以删除订单)
export const del = (param: IDelOrderReq): Promise<IApiResp> => {
  return request.post("/order/del", param)
}
