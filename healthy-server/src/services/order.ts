import { Filter, ObjectId } from "mongodb"
import * as db from "../db"
import { stats } from "../libs/stats"
import { IOrder, IUserProject } from "../models/types"
import * as userProject from "./userProject"
import { listOrdersFunc } from "./utils"

// 添加 (用户端：首页/套餐详情页)
// 套餐中项目不少于1个
export async function add(pkgId: string, uid: ObjectId) {
  const pkgObj = await db.packages.findOne({ _id: new ObjectId(pkgId) })
  if (!pkgObj) throw stats.ErrHcPackageNotFind
  // 一个用户只能有一个未完成订单
  const hasOrder = await db.orders.findOne({uid,isDone:false})
  if(hasOrder) throw stats.ErrHasAnOrderUnfinished
  // 添加订单
  const orderObj: IOrder = {
    uid,
    pkgId: pkgObj._id,
    isDone: false,
    createdAt: Date.now(),
    endAt: -1,
  }
  const result = await db.orders.insertOne(orderObj)
  // 为当前用户创建该订单套餐中的所有项目
  for (const proId of pkgObj.proIds) {
    await userProject.add(uid, result.insertedId, proId)
  }
  return result.insertedId
}

// 获取所有订单信息：uid用户名，pkgId套餐名，own下订时间，完成时间，是否完成 (管理员端：订单管理页)
export async function listOrders() {
  // 管理员获取所有的订单，后期需要支持分页
  // 这里使用多表联查，减少查表次数，提高查询速度
  const items = await listOrdersFunc()
  return items
}

// 获取用户订单 (客户端：个人/我的订单)
export async function listUserOrders(uid: ObjectId) {
  // 获取用户的订单
  const items = await listOrdersFunc(uid)
  return items
}

// 删除订单
export async function del(ordId: string) {
  // 首先将当前订单删了
  const { value } = await db.orders.findOneAndDelete({
    _id: new ObjectId(ordId),
  })
  if (!value) throw stats.ErrOrderNotFind

  // 然后将订单下的所有用户项目都删了
  await db.userProjects.deleteMany({ ordId: value._id })
}
