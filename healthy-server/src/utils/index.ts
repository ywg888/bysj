import { IProject, IQueuedPro, IUserProStatus } from "../models/types"

/**
 * @describe 用于智能排序体检项目
 * 排序原则：（优先级从上往下）
 * 1. 已完成项目排在最下面
 * 2. 空腹的排最前面
 * 3. 等待时间少的排前面
 * @params projects: IQueuedPro[]
 */
export function proSort(projects: IQueuedPro[]) {
  // 已完成项目
  const finishedPros = projects.filter(
    (project) => project.status === IUserProStatus.finished
  )
  // 其他项目（未完成项目和排队中项目）
  const otherPros = projects.filter(
    (project) => project.status !== IUserProStatus.finished
  )
  // 将其他项目排序
  otherPros.sort((a, b) => a.waitingTime - b.waitingTime)
  // otherPros中空腹项目
  const emptyPros = otherPros.filter((project) => project.needEmpty)
  // otherPros中空腹项目以外的项目
  const other2Pros = otherPros.filter((project) => !project.needEmpty)
  // 最后合并输出
  return emptyPros.concat(other2Pros.concat(finishedPros))
}
