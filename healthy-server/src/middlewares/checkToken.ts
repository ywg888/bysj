import { Context, Middleware, Next } from "koa"
import * as db from "../db"
import { stats } from "../libs/stats"

// 设计白名单
const whiteList = [
  "/api/user/wxAuthorize",
  "/api/user/login",
  "/api/user/register",
  "/wxLogin/Feed_App.svg",
  "/api/user/adminLogin",
  "/favicon.ico",
  // "/api/project/listPros",
  "/api/user/adminRegiste",
]

/**
 * 检查Token
 * @param ctx
 * @param next
 */
const checkToken: Middleware = async (ctx: Context, next: Next) => {
  let inWhiteList = whiteList.findIndex((item) => item === ctx.path)
  const token = ctx.cookies.get("token")
  const session = await db.sessions.findOne({ sid: token })
  if (inWhiteList === -1) {
    // 不在白名单内
    if (!session) throw stats.ErrUserNotLogin
    const userinfo = await db.users.findOne({ _id: session.uid })
    ctx.state.user = userinfo
  } else {
    if (session) throw stats.ErrUserAlreadyLogin
  }
  await next()
}

export default checkToken
