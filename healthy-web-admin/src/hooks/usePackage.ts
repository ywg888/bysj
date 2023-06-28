import { useCallback, useEffect, useState } from "react"
import { IPackage } from "../type"
import * as packageService from "../service/api/hcPackage"
import {
  IAddPkgReq,
  IDelPkgReq,
  IEditPkgReq,
  IListAllPkgReq,
} from "../service/types/reqType"
import { message } from "antd"

export default function usePackage() {
  const [packages, setPackages] = useState<IPackage[]>([])

  // 添加
  const add = useCallback(
    async (params: IAddPkgReq) => {
      const { code, message: resMsg, data } = await packageService.add(params)
      if (code === 0) {
        message.success("添加成功")
        const pkgObj = { ...params, _id: data }
        setPackages([...packages, pkgObj])
      } else {
        message.error(resMsg)
      }
    },
    [packages]
  )

  // 查询所有套餐
  const listAll = useCallback(async (params: IListAllPkgReq) => {
    const { code, message: resMsg, data } = await packageService.listAll(params)
    if (code === 0) {
      setPackages(data)
    } else {
      message.error(resMsg)
    }
  }, [])

  // 修改套餐
  const edit = useCallback(
    async (params: IEditPkgReq) => {
      const { code, message: resMsg } = await packageService.edit(params)
      if (code === 0) {
        message.success("修改成功")
        const {
          pkgId,
          name,
          avatar,
          banner,
          gender,
          marriedLimit,
          introduce,
          price,
          proIds,
        } = params
        const index = packages.findIndex((item) => item._id === pkgId)
        packages[index] = {
          _id: pkgId,
          name,
          avatar,
          banner,
          gender,
          marriedLimit,
          introduce,
          price,
          proIds,
        }
        setPackages([...packages])
      } else {
        message.error(resMsg)
      }
    },
    [packages]
  )

  // 删除
  const del = useCallback(
    async (params: IDelPkgReq) => {
      const { code, message: resMsg } = await packageService.del(params)
      if (code === 0) {
        message.success("删除成功")
        const index = packages.findIndex((item) => item._id === params.pkgId)
        packages.splice(index, 1)
        setPackages([...packages])
      } else {
        message.error(resMsg)
      }
    },
    [packages]
  )

  useEffect(() => {
    listAll({})
  }, [listAll])

  return {
    packages,
    setPackages,
    add,
    listAll,
    edit,
    del,
  }
}
