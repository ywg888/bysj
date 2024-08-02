import { useCallback, useEffect, useState } from "react"
import { IPackage } from "../type"
import * as packageService from "../service/api/hcPackage"
import { IListAllPkgReq } from "../service/types/reqType"
import { Toast } from "antd-mobile"

export default function useHcPackage() {
  const [packages, setPackages] = useState<IPackage[]>([])

  // 查询所有套餐
  const listAll = useCallback(async (params: IListAllPkgReq) => {
    const { code, message, data } = await packageService.listAll(params)
    if (code === 0) {
      setPackages(data)
    } else {
      Toast.show({
        content: message,
      })
    }
  }, [])

  useEffect(() => {
    listAll({})
  }, [listAll])

  return { packages, listAll }
}
