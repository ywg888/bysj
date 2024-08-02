import Joi from "joi"
import Router from "koa-router"
import { JsonResp } from "../libs/stats"
import validate from "../libs/validate"
import * as user from "../services/user"
import * as crypto from "crypto"

const router = new Router({
  prefix: "/api/user",
})

interface wxInfo {
  id: string
  openid: string
  nickname: string
  headimgurl: string
}

const wxInfoArr: wxInfo[] = []

// 客户端
// 微信授权
router.get("/wxAuthorize", async (ctx) => {
  const { code } = ctx.query
  ctx.redirect(`http://${process.env.WEB_CLIENT_URL}/wxLogin/${code}`)
})

// 登录
router.post("/login", async (ctx) => {
  const { code } = validate(
    ctx.request.body,
    Joi.object({
      code: Joi.string().required(),
    })
  )
  const { userObj, status } = (await user.wxAuthorize(code as string)) as any
  const { nickname, headimgurl, openid } = userObj
  if (status === 1) {
    // 第一次登录，返回前端code为1，表示要注册
    const id = crypto.randomBytes(12).toString("hex")
    wxInfoArr.push({ id, nickname, headimgurl, openid })
    ctx.body = new JsonResp({ id, nickname, headimgurl }, 1)
  } else {
    const sid = await user.createSession(openid, ctx.request.ip)
    ctx.cookies.set("token", sid)
    ctx.body = new JsonResp()
  }
})

// 注册当前公众号下的账号
router.post("/register", async (ctx) => {
  const { id, account } = validate(
    ctx.request.body,
    Joi.object({
      id: Joi.string().required(),
      account: Joi.string().max(20).required(),
    })
  )
  const index = wxInfoArr.findIndex((item) => item.id === id)
  const { openid, nickname, headimgurl } = wxInfoArr[index]
  await user.create(account, openid, nickname, headimgurl)
  // 创建好用户之后，自动创建对应的对话，设置cookie，前端跳转到业务页面即可
  const sid = await user.createSession(openid, ctx.request.ip)
  ctx.cookies.set("token", sid)
  wxInfoArr.splice(index, 1)
  ctx.body = new JsonResp()
})

// 退出登录
router.post("/logout", async (ctx) => {
  const token = ctx.cookies.get("token")
  await user.logout(token)
  ctx.cookies.set("token", "")
  ctx.body = new JsonResp()
})

// 编辑当前用户的信息
router.post("/editUser", async (ctx) => {
  const { nickname, avatar, banner, introduce } = validate(
    ctx.request.body,
    Joi.object({
      nickname: Joi.string().max(20).required(),
      avatar: Joi.string()
        .uri({
          scheme: ["http", "https"],
        })
        .required(),
      banner: Joi.string()
        .allow("")
        .uri({
          scheme: ["http", "https"],
        })
        .required(),
      introduce: Joi.string().max(240).required(),
    })
  )
  await user.editUser(
    nickname,
    avatar,
    banner,
    introduce,
    ctx.state.user.account
  )
  ctx.body = new JsonResp()
})

// 获取用户信息
router.get("/getUserInfo", async (ctx) => {
  const { account } = validate(
    ctx.query,
    Joi.object({
      account: Joi.string().max(20),
    })
  )
  const finallyAccount = account ? account : ctx.state.user.account
  const userInfo = await user.getUserInfo(finallyAccount)
  ctx.body = new JsonResp(userInfo)
})

// 管理员端登录(管理员端)
router.post("/adminLogin", async (ctx) => {
  const { account, password } = validate(
    ctx.request.body,
    Joi.object({
      account: Joi.string().required(),
      password: Joi.string().max(20).required(),
    })
  )

  const sid = await user.adminLogin(account, password, ctx.request.ip)
  ctx.cookies.set("token", sid)
  ctx.body = new JsonResp()
})

// 管理员端注册功能
router.post("/adminRegiste", async (ctx) => {
  const { account, password } = validate(
    ctx.request.body,
    Joi.object({
      account: Joi.string().required(),
      password: Joi.string().max(20).required(),
    })
  )

  await user.adminRegist(account, password)
  ctx.body = new JsonResp()
})

export default router
