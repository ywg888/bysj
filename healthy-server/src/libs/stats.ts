/**
 * 统一JSON返回封装类
 */
export class JsonResp {
  code: number
  data?: any

  constructor(data?: any, code = 0) {
    this.data = data
    this.code = code
  }
}

/**
 * 错误状态
 */
export class ErrorStat extends JsonResp {
  message: string
  status: number

  // （这里status 默认 给的是200，然后继承JsomResp，报错了自然没有data返回，所以直接填undefined即可）
  constructor(code: number, message: string, status = 200) {
    super(undefined, code)
    this.message = message
    this.status = status
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    }
  }
}

/**
 * 业务状态错误码
 */
export const stats = {
  ErrUserNotLogin: new ErrorStat(10002, "用户未登录"),
  ErrUserAlreadyLogin: new ErrorStat(10003, "用户已登录"),
  ErrWeChatWithoutAuthorization: new ErrorStat(10004, "微信未授权"),
  ErrUserNotExists: new ErrorStat(10005, "用户不存在"),
  ErrAccountExists: new ErrorStat(10006, "当前账号名已存在"),
  ErrPassword: new ErrorStat(10007, "密码不正确"),
  ErrProjectNotFind: new ErrorStat(20001, "体检项目不存在"),
  ErrProjectExists: new ErrorStat(20002, "体检项目已存在"),
  ErrHcPackageNotFind: new ErrorStat(30001, "体检套餐不存在"),
  ErrHcPackageExists: new ErrorStat(30002, "体检套餐已存在"),
  ErrHcPackageNolyHasThis:new ErrorStat(30003,"该项目为某个套餐中的最后一个项目"),
  ErrOrderNotFind:new ErrorStat(50001,"订单不存在"),
  ErrHasAnOrderUnfinished:new ErrorStat(50002,"存在未完成订单"),
}
