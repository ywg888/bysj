export interface ApiResp<T = any> {
  code: number
  message: string
  data: T
}

// 用户表
export interface IUser {
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
}

// 用户微信基本信息
export interface IBaseInfo {
  id: string
  nickname: string
  headimgurl: string
}

// 会话
export interface ISession {
  // session id
  sid: string
  // 关联的用户_id
  uid: string
  // 登录的ip地址
  ip: string
  // 创建时间
  createdAt: Date
}

// 项目表
export interface IProject {
  _id: string
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
  _id: string
  uid: string
  ordId: string
  proId: string
  joinAt: number
  // result:string
  status: IUserProStatus
}

// 用户排队项目
export interface IQueuedPro {
  userProId: string
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
  _id: string
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
  proIds: string[]
}

// 订单表
export interface IOrder {
  _id: string
  uid: string
  pkgId: string
  isDone: boolean
  createdAt: number
  endAt: number
}

// 订购了一个套餐之后，那么就可以通过uid和pid绑定，再通过pid找到该套餐下的所有项目，全部创建一遍，即可

// other
// 全局项目
export interface IProjectBaseinfo {
  _id: string
  name: string
}

// ws发送数据类型
export enum IWsType {
  connect = 1,
  sendData = 2,
}
