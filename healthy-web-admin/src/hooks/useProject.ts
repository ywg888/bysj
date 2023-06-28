import { useCallback, useContext, useEffect, useState } from "react"
import { IProject } from "../type"
import * as projectService from "../service/api/project"
import {
  IAddProjectReq,
  IDelProjectReq,
  IEditProjectReq,
} from "../service/types/reqType"
import { message } from "antd"
import { context } from "./store"

export default function useProject() {
  const [projects, setProjects] = useState<IProject[]>([])
  const { setProjectMap } = useContext(context)

  const add = useCallback(
    async (params: IAddProjectReq) => {
      const { code, message: resMsg, data } = await projectService.add(params)
      if (code === 0) {
        message.success("添加成功")
        const projectObj = { ...params, _id: data }
        setProjects([...projects, projectObj])
      } else {
        message.error(resMsg)
      }
    },
    [projects]
  )

  // 获取所有项目类型
  const listPros = useCallback(async () => {
    const { code, message: resMsg, data } = await projectService.listPros()
    if (code === 0) {
      setProjects(data)
    } else {
      message.error(resMsg)
    }
  }, [])

  // 编辑
  const edit = useCallback(
    async (params: IEditProjectReq) => {
      const { code, message: resMsg } = await projectService.edit(params)
      if (code === 0) {
        message.success("修改成功")
        const { proId, name, duration, needEmpty, address, introduce } = params
        const index = projects.findIndex((item) => item._id === proId)
        projects[index] = {
          _id: proId,
          name,
          duration,
          needEmpty,
          address,
          introduce,
        }
        setProjects([...projects])
      } else {
        message.error(resMsg)
      }
    },
    [projects]
  )

  // 删除
  const del = useCallback(
    async (params: IDelProjectReq) => {
      const { code, message: resMsg } = await projectService.del(params)
      if (code === 0) {
        message.success("删除成功")
        const index = projects.findIndex((item) => item._id === params.proId)
        projects.splice(index, 1)
        setProjects([...projects])
      } else {
        message.error(resMsg)
      }
    },
    [projects]
  )

  useEffect(() => {
    listPros()
  }, [listPros])

  useEffect(() => {
    const projectArr = projects.map((item) => {
      const { _id, name } = item
      return { _id, name }
    })
    setProjectMap(projectArr)
  }, [projects, setProjectMap])

  return {
    projects,
    setProjects,
    add,
    edit,
    del,
  }
}
