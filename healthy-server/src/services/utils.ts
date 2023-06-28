import { Filter, ObjectId } from "mongodb"
import { IOrder } from "../models/types"
import * as db from "../db"

export async function listOrdersFunc(uid?: ObjectId) {
  let match: Filter<IOrder> = {}
  if (uid) match = { uid }
  const items = await db.orders
    .aggregate([
      { $match: match },
      {
        $lookup: {
          from: "users",
          localField: "uid",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $lookup: {
          from: "packages",
          localField: "pkgId",
          foreignField: "_id",
          as: "pkgInfo",
        },
      },
      { $unwind: "$userInfo" },
      { $unwind: "$pkgInfo" },
      // 将嵌套对象中的属性提取到外面，然后选择提取即可
      {
        $replaceRoot: {
          // 将$$ROOT放在最后面，_id才会是order的id，因为后面的会覆盖前面的
          newRoot: { $mergeObjects: ["$userInfo", "$pkgInfo", "$$ROOT"] },
        },
      },
      {
        $project: {
          _id: 1,
          isDone: 1,
          createdAt: 1,
          endAt: 1,
          account: 1,
          name: 1,
        },
      },
    ])
    .toArray()
  return items
}
