import request from "../request"
import { IAddOrderReq } from "../types/reqType"
import { IApiResp, IListOrdersResp } from "../types/respType"

// 添加 (客户端：首页/套餐详情页)
export const add = (param: IAddOrderReq): Promise<IApiResp> => {
  return request.post("/order/add", param)
}

// 获取用户的所有订单 (客户端：个人/我的订单)
export const listUserOrders = (): Promise<IApiResp<IListOrdersResp[]>> => {
  return request.get("/order/listUserOrders")
}
