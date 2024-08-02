import Joi from "joi"
import Router from "koa-router"
import { JsonResp } from "../libs/stats"
import validate from "../libs/validate"
import * as userProject from "../services/userProject"

const router = new Router({
  prefix: "/api/userProject",
})

// 获取某类排队项目 (管理员端：体检管理页面)
router.get("/listQueuePros", async (ctx) => {
  const { name } = validate(
    ctx.query,
    Joi.object({
      name: Joi.string().required(),
    })
  )
  const result = await userProject.listQueuePros(name)
  ctx.body = new JsonResp(result)
})

// 获取用户订购套餐中的所有项目以及排队情况 (客户端：主业务，查看体检排队人数的时候使用)
// 这里前端需要动态更新数据，采用websocket技术，客户端和服务端建立长连接，动态选择排队的项目之后，服务端就要及时通知
// 前端要搭配节流使用，防止高频率更换状态
router.get("/listUserPros", async (ctx) => {
  const result = await userProject.listUserPros(ctx.state.user._id)
  ctx.body = new JsonResp(result)
})

// 参与排队
router.post("/join", async (ctx) => {
  const { userProId } = validate(
    ctx.request.body,
    Joi.object({
      userProId: Joi.string().required(),
    })
  )
  await userProject.join(userProId)
  ctx.body = new JsonResp()
})

// 确认完成
router.post("/finish", async (ctx) => {
  const { userProId } = validate(
    ctx.request.body,
    Joi.object({
      userProId: Joi.string().required(),
    })
  )
  await userProject.finish(userProId)
  ctx.body = new JsonResp()
})

export default router
