import { useCallback, useEffect, useState } from "react"
import * as orderService from "../service/api/order"
import { IAddOrderReq, IDelOrderReq } from "../service/types/reqType"
import { message } from "antd"
import { IListOrdersResp } from "../service/types/respType"

export default function useOrder() {
  const [orders, setOrders] = useState<IListOrdersResp[]>([])

  // 添加
  const add = useCallback(async (params: IAddOrderReq) => {
    const { code, message: resMsg } = await orderService.add(params)
    if (code === 0) {
      message.success("订购成功")
    } else {
      message.error(resMsg)
    }
  }, [])

  // 获取所有项目类型
  const listOrders = useCallback(async () => {
    const { code, message: resMsg, data } = await orderService.listOrders()
    if (code === 0) {
      setOrders(data)
    } else {
      message.error(resMsg)
    }
  }, [])

  // 删除
  const del = useCallback(
    async (params: IDelOrderReq) => {
      const { code, message: resMsg } = await orderService.del(params)
      if (code === 0) {
        message.success("删除成功")
        const index = orders.findIndex((item) => item._id === params.ordId)
        orders.splice(index, 1)
        setOrders([...orders])
      } else {
        message.error(resMsg)
      }
    },
    [orders]
  )

  useEffect(() => {
    listOrders()
  }, [listOrders])

  return {
    orders,
    listOrders,
    add,
    del,
  }
}
