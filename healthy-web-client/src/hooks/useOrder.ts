import { Toast } from "antd-mobile"
import { useCallback, useEffect, useState } from "react"
import * as orderService from "../service/api/order"
import { IListOrdersResp } from "../service/types/respType"

export default function useOrder() {
  const [orders, setOrders] = useState<IListOrdersResp[]>([])

  // 获取用户信息
  const listUserOrders = useCallback(async () => {
    const { code, message, data } = await orderService.listUserOrders()
    if (code === 0) {
      setOrders(data)
    } else {
      Toast.show({
        content: message,
      })
    }
  }, [])

  useEffect(() => {
    listUserOrders()
  }, [listUserOrders])

  return {
    orders,
    listUserOrders,
  }
}
