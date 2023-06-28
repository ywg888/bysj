import { IProject } from "../models/types"
import * as db from "../db"
import { ObjectId } from "mongodb"
import { stats } from "../libs/stats"

// 添加
export async function add(
  name: string,
  duration: number,
  introduce: string,
  address: string,
  needEmpty: boolean
) {
  // 需要注意的是：不能添加同名公共项目
  const project = await db.projects.findOne({ name })
  if (project) throw stats.ErrProjectExists
  const projectObj: IProject = {
    name,
    duration,
    introduce,
    address,
    needEmpty,
  }
  const result = await db.projects.insertOne(projectObj)
  return result.insertedId
}

// 获取所有项目类型  (管理员端：项目管理页面)
export async function listPros() {
  const items = await db.projects.find().toArray()
  return items
}

// 修改 (管理员端：项目管理页面)
export async function edit(
  proId: string,
  name: string,
  duration: number,
  introduce: string,
  address: string,
  needEmpty: boolean
) {
  const project = await db.projects.findOne({ _id: new ObjectId(proId) })
  if (!project) throw stats.ErrProjectNotFind
  await db.projects.updateOne(
    { _id: project._id },
    { $set: { name, duration, introduce, address, needEmpty } }
  )
}

// 删除
export async function del(proId: string) {
  // 判断该项目是否为某个套餐中最后一个项目
  const packageArr = await db.packages.find().toArray()
  const flag = packageArr.some(
    (packageItem) =>
      packageItem.proIds.includes(new ObjectId(proId)) &&
      packageItem.proIds.length === 1
  )
  if (flag) throw stats.ErrHcPackageNolyHasThis
  // 删除该项目
  const result = await db.projects.findOneAndDelete({
    _id: new ObjectId(proId),
  })
  if (!result.value) throw stats.ErrProjectNotFind
  // 注意，还没写完，这里删除了还要将含有该项目的套餐进行处理，同步删除
  // 后期更需要注意：前端使用套餐中的数据都应该由源数据计算得出，才能保持数据的一致性
  for (const packageItem of packageArr) {
    const { _id, proIds } = packageItem
    const index = proIds.findIndex((item) => item.toString() === proId)
    proIds.splice(index, 1)
    db.packages.updateOne({ _id }, { $set: { proIds } })
  }
  // packageArr.forEach((packageItem) => {
  //   const { _id, proIds } = packageItem
  //   const index = proIds.findIndex((item) => item.toString() === proId)
  //   proIds.splice(index, 1)
  //   db.packages.updateOne({ _id }, { $set: { proIds } })
  // })
  // 还需要将使用了该项目的用户项目全部删掉
  await db.userProjects.deleteMany({ proId: new ObjectId(proId) })
}
