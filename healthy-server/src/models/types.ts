import { ObjectId } from "mongodb"

// 用户表
export interface IUser {
  // 微信openid
  openid: string
  // 头像
  avatar: string
  // 背景图片
  banner: string
  // 账号名
  account: string
  // 昵称
  nickname: string
  // 创建时间
  createdAt: number
  // 个人介绍
  introduce: string
  // 管理员端密码
  password?: string
}

// 会话
export interface ISession {
  // session id
  sid: string
  // 关联的用户_id
  uid: ObjectId
  // 登录的ip地址
  ip: string
  // 创建时间
  createdAt: Date
}

// 项目表
export interface IProject {
  name: string
  duration: number
  introduce: string
  address: string
  // 是否需要空腹
  needEmpty: boolean
}

export enum IUserProStatus {
  unfinished = 1,
  pending,
  finished,
}

// 用户项目表
export interface IUserProject {
  uid: ObjectId
  ordId: ObjectId
  proId: ObjectId
  joinAt: number
  // result:string
  status: IUserProStatus
}

// 用户排队项目
export interface IQueuedPro {
  name: string
  needEmpty: boolean
  address: string
  queueLength: number
  waitingTime: number
  status: IUserProStatus
}

export enum IGender {
  male = 1,
  female,
}

// 套餐表
export interface IPackage {
  name: string
  avatar: string
  banner: string
  // 性别
  gender: IGender
  // 限制已婚
  marriedLimit: boolean
  introduce: string
  price: number
  // 套餐下的项目id
  proIds: ObjectId[]
  isDel: boolean
}

// 订单表
export interface IOrder {
  uid: ObjectId
  pkgId: ObjectId
  isDone: boolean
  createdAt: number
  endAt: number
}

// 订购了一个套餐之后，那么就可以通过uid和pid绑定，再通过pid找到该套餐下的所有项目，全部创建一遍，即可
