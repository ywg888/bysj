import * as db from "../db"
import { ObjectId } from "mongodb"
import { stats } from "../libs/stats"
import { IQueuedPro, IUserProject, IUserProStatus } from "../models/types"
import { proSort } from "../utils"

// 添加
export async function add(uid: ObjectId, ordId: ObjectId, proId: ObjectId) {
  const userProjectObj: IUserProject = {
    uid,
    ordId,
    proId,
    joinAt: 0,
    status: IUserProStatus.unfinished,
  }
  await db.userProjects.insertOne(userProjectObj)
}

// 获取某类排队项目 (管理员端：体检管理页面)
export async function listQueuePros(name: string) {
  const project = await db.projects.findOne({ name })
  if (!project) stats.ErrProjectNotFind
  const items = await db.userProjects
    .aggregate([
      { $match: { status: IUserProStatus.pending, proId: project._id } },
      { $sort: { joinAt: 1 } },
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $replaceRoot: {
          // 将$$ROOT放在最后面，_id才会是order的id，因为后面的会覆盖前面的
          newRoot: { $mergeObjects: ["$userInfo", "$$ROOT"] },
        },
      },
      {
        $project: {
          _id: 1,
          account: 1,
          joinAt: 1,
        },
      },
    ])
    .toArray()
  return items
}

// 获取用户订购套餐中的所有项目以及排队情况 (客户端用：主业务，查看体检排队人数的时候使用)
export async function listUserPros(uid: ObjectId) {
  const order = await db.orders.findOne({ uid, isDone: false })
  if (!order) throw stats.ErrOrderNotFind
  const { name: pkgName } = await db.packages.findOne({ _id: order.pkgId })
  const userPros = await db.userProjects
    .find({ ordId: order._id, uid })
    .toArray()
  const queuePros: IQueuedPro[] = []
  for (const userPro of userPros) {
    const { name, needEmpty, address, duration } = await db.projects.findOne({
      _id: userPro.proId,
    })
    let queueLength: number
    let waitingTime: number
    switch (userPro.status) {
      case IUserProStatus.unfinished:
        // 未完成的项目：展示排队中，当前项目的所有人
        queueLength = await db.userProjects.countDocuments({
          status: IUserProStatus.pending,
          proId: userPro.proId,
        })
        waitingTime = queueLength * duration
        break
      case IUserProStatus.pending:
        // 排队中的项目：展示派对中，当前项目，排队时间在我前面的人
        queueLength = await db.userProjects.countDocuments({
          status: IUserProStatus.pending,
          proId: userPro.proId,
          joinAt: { $lt: userPro.joinAt },
        })
        waitingTime = queueLength * duration
        break
      default:
        // 已完成的情况，给-1
        queueLength = -1
        waitingTime = -1
        break
    }

    const queuePro = {
      userProId: userPro._id,
      name,
      needEmpty,
      address,
      queueLength,
      waitingTime,
      status: userPro.status,
    }
    queuePros.push(queuePro)
  }
  return { pkgName, queuedPros: proSort(queuePros) }
}

// 参与排队
export async function join(userProId: string) {
  await db.userProjects.updateOne(
    { _id: new ObjectId(userProId) },
    { $set: { status: IUserProStatus.pending, joinAt: Date.now() } }
  )
}

// 确认完成
export async function finish(userProId: string) {
  await db.userProjects.updateOne(
    {
      _id: new ObjectId(userProId),
    },
    { $set: { status: IUserProStatus.finished } }
  )

  const { uid } = await db.userProjects.findOne({
    _id: new ObjectId(userProId),
  })

  // 如下操作是为了判断该项目所在订单是否完成
  // 获取当前用户项目属于哪个订单
  const { _id } = await db.orders.findOne({ uid, isDone: false })
  // 获取属于该订单的所有用户项目
  const userPros = await db.userProjects.find({ ordId: _id }).toArray()
  const flag = userPros.every(
    (userPro) => userPro.status === IUserProStatus.finished
  )

  if (flag) {
    // 全部都完成了，就需要将order订单的状态设置未完成，还有完成时间也要设置
    await db.orders.updateOne(
      { _id },
      { $set: { isDone: true, endAt: Date.now() } }
    )
  }
}
