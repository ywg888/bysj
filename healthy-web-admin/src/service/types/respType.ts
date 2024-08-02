export interface IApiResp<T = any> {
  code: number
  message: string
  data: T
}

export interface IUserTestResp {
  name: string
  age: number
}

// 未完成
export interface IListAllPkgResp {
  _id: string
  name: string
  avatar: string
  banner: string
  gender: string
  minAge: number
  maxAge: number
  marriedLimit: boolean
  introduce: string
  price: number
  proIds: string[]
}

export interface IListOrdersResp {
  _id: string
  isDone: boolean
  createdAt: number
  endAt: number
  account: string
  name: string
}

export interface IListQueueProsResp {
  _id: string
  account: string
  joinAt: number
}
