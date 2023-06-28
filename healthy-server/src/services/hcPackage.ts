import { Filter, ObjectId } from "mongodb"
import { IGender, IPackage } from "../models/types"
import * as db from "../db"
import { stats } from "../libs/stats"

export interface IHcPackageAdd {
  name: string
  avatar: string
  banner: string
  gender: IGender
  marriedLimit: boolean
  introduce: string
  price: number
  proIds: string[]
}

export interface IPkgFilter {
  gender?: IGender
  marriedLimit?: boolean
}

export async function add(params: IHcPackageAdd) {
  const proIds = params.proIds.map((item) => new ObjectId(item))
  const { name, avatar, banner, gender, marriedLimit, introduce, price } =
    params
  // 不允许添加重名套餐
  const hcPackage = await db.packages.findOne({ name })
  if (hcPackage) throw stats.ErrHcPackageExists
  const hcPackageObj = {
    name,
    avatar,
    banner,
    gender,
    marriedLimit,
    introduce,
    price,
    proIds,
    isDel: false,
  }
  const result = await db.packages.insertOne(hcPackageObj)
  return result.insertedId
}

// 列出指定条件套餐（还需要添加各种条件判断：性别，年龄，婚否，价格）
export async function listAll(params: IPkgFilter) {
  let match: Filter<IPackage> = { isDel: false }
  // 后期做
  // for (const key in params) {
  //   if (params[key] !== undefined) {
  //     if (key === "minAge") {
  //       match[key] = { $gte: params[key] }
  //     } else if (key === "maxAge") {
  //       match[key] = { $lte: params[key] }
  //     } else {
  //       match[key] = params[key]
  //     }
  //   }
  // }
  const items = await db.packages
    .find(match, { projection: { isDel: 0 } })
    .toArray()
  return items
}

// 获取某个套餐下的详细信息：套餐的信息，关联的项目的信息（客户端：首页/套餐详情页）
export async function getDetail(pkgId: string) {
  const pkgInfo = await db.packages.findOne(
    { _id: new ObjectId(pkgId) },
    { projection: { _id: 0, isDel: 0 } }
  )
  if(!pkgInfo) throw stats.ErrHcPackageNotFind
  const match = pkgInfo.proIds.map((item) => {
    return { _id: item }
  })
  const proItems = await db.projects
    .find(
      { $or: [...match] },
      { projection: { _id: 0, name: 1, introduce: 1 } }
    )
    .toArray()
  return { pkgInfo, proItems }
}

export async function edit(params: IHcPackageAdd & { pkgId: string }) {
  const {
    name,
    avatar,
    banner,
    gender,
    marriedLimit,
    introduce,
    price,
    pkgId,
  } = params
  const proIds = params.proIds.map((item) => new ObjectId(item))
  const hcPackage = await db.packages.findOne({ _id: new ObjectId(pkgId) })
  if (!hcPackage) throw stats.ErrHcPackageNotFind
  await db.packages.updateOne(
    { _id: hcPackage._id },
    {
      $set: {
        name,
        avatar,
        banner,
        gender,
        marriedLimit,
        introduce,
        price,
        proIds,
      },
    }
  )
}

export async function del(pkgId: string) {
  // 这里使用逻辑删除
  await db.packages.updateOne(
    {
      _id: new ObjectId(pkgId),
    },
    { $set: { isDel: true } }
  )
}
