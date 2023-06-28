import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import * as userProjectService from "../service/api/userProject"
import { IJoinReq } from "../service/types/reqType"
import { message } from "antd"
import { IListQueueProsResp } from "../service/types/respType"
import { context } from "./store"
import { listPros } from "../service/api/project"

export default function useUserProject() {
  const { projectMap, setProjectMap } = useContext(context)
  const options = useMemo(
    () =>
      projectMap.map((item) => {
        return { value: item.name, label: item.name }
      }),
    [projectMap]
  )
  const [userProjects, setUserProjects] = useState<IListQueueProsResp[]>([])

  // 获取某类排队项目
  const listQueuePros = useCallback(async (name: string) => {
    const {
      code,
      message: resMsg,
      data,
    } = await userProjectService.listQueuePros(name)
    if (code === 0) {
      setUserProjects(data)
    } else {
      message.error(resMsg)
    }
  }, [])

  // 确认完成 （记得ws啊）
  const finish = useCallback(
    async (params: IJoinReq) => {
      const { code, message: resMsg } = await userProjectService.finish(params)
      if (code === 0) {
        message.success("确认成功")
        const index = userProjects.findIndex(
          (item) => item._id === params.userProId
        )
        userProjects.splice(index, 1)
        setUserProjects([...userProjects])
      } else {
        message.error(resMsg)
      }
    },
    [userProjects]
  )

  useEffect(() => {
    listPros()
      .then((res) => {
        const projectArr = res.data.map((item) => {
          const { _id, name } = item
          return { _id, name }
        })
        setProjectMap(projectArr)
        if(projectArr[0].name){
          listQueuePros(projectArr[0].name)
        }
      })
      .catch((err) => console.error(err))
  }, [listQueuePros, setProjectMap])

  return {
    userProjects,
    listQueuePros,
    finish,
    options,
  }
}
