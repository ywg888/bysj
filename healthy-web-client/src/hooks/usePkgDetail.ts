import { useCallback, useEffect, useState } from "react"
import * as packageService from "../service/api/hcPackage"
import * as orderService from "../service/api/order"
import {
  IAddOrderReq,
  IAddPkgReq,
  IGetPkgDetailReq,
} from "../service/types/reqType"
import { Toast } from "antd-mobile"
import { IProIntroduceItem } from "../service/types/respType"
import { useNavigate } from "react-router-dom"

export default function usePkgDetail(pkgId: string) {
  const [hcPackage, setHcPackage] = useState<IAddPkgReq>()
  const [proIntroduces, setProIntroduces] = useState<IProIntroduceItem[]>([])
  const navigate = useNavigate()

  // 查询套餐详情
  const pkgDetail = useCallback(async (params: IGetPkgDetailReq) => {
    const { code, message, data } = await packageService.getDetail(params)
    if (code === 0) {
      const { pkgInfo, proItems } = data
      setHcPackage(pkgInfo)
      setProIntroduces(proItems)
    } else {
      Toast.show({ content: message })
    }
  }, [])

  // 添加订单
  const addOrder = useCallback(async (params: IAddOrderReq) => {
    const { code, message } = await orderService.add(params)
    if (code === 0) {
      Toast.show({ content: "添加成功" })
      navigate(-1)
    } else {
      Toast.show({ content: message })
    }
  }, [navigate])

  useEffect(() => {
    pkgDetail({ pkgId })
  }, [pkgDetail, pkgId])

  return { hcPackage, proIntroduces, addOrder }
}
