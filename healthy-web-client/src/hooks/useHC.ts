import { useCallback, useEffect, useState } from "react"
import { IQueuedPro, IUserProStatus } from "../type"
import * as userProjectService from "../service/api/userProject"
import { Toast } from "antd-mobile"
import { IJoinReq } from "../service/types/reqType"

export default function useHC() {
  const [pkgName, setPkgName] = useState<string>()
  const [queuedPros, setQueuedPros] = useState<IQueuedPro[]>([])

  const listUserPros = useCallback(async () => {
    const { code, message, data } = await userProjectService.listUserPros()
    if (code === 0) {
      const { pkgName, queuedPros } = data
      setPkgName(pkgName)
      setQueuedPros(queuedPros)
    } else {
      Toast.show({ content: message })
      setQueuedPros([])
    }
  }, [])

  // 参与排队（记得ws啊，完成）
  const join = useCallback(
    async (params: IJoinReq) => {
      const { code, message } = await userProjectService.join(params)
      if (code === 0) {
        Toast.show({ content: "排队成功" })
        const index = queuedPros.findIndex(
          (item) => item.userProId === params.userProId
        )
        queuedPros[index].status = IUserProStatus.pending
        setQueuedPros([...queuedPros])
        // ws通知管理员和其它客户端
        // send({ type: IWsSendType.sendData, data: { hhh: "嘿嘿嘿" } })
      } else {
        Toast.show({ content: message })
      }
    },
    [queuedPros]
  )

  useEffect(() => {
    listUserPros()
  }, [listUserPros])

  return { queuedPros, pkgName, listUserPros, join }
}
