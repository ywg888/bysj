import Joi from "joi"
import Router from "koa-router"
import { JsonResp } from "../libs/stats"
import validate from "../libs/validate"
import * as order from "../services/order"

const router = new Router({
  prefix: "/api/order",
})

// 添加 (客户端：首页/套餐详情页)
// 1. 添加之前需要先查找该用户是否已经有了订单，有的话就不能重复创建了
// 2. 添加订单之后，需要将对应套餐中的项目依次创建对应的用户项目
router.post("/add", async (ctx) => {
  const { pkgId } = validate(
    ctx.request.body,
    Joi.object({
      pkgId: Joi.string().required(),
    })
  )
  const result = await order.add(pkgId, ctx.state.user._id)
  ctx.body = new JsonResp(result)
})

// 获取所有订单信息：用户名，套餐名，下订时间，完成时间，是否完成 (管理员端：订单管理页)
// 1. 展示顺序：按照正常的创建时间来展示
// 2. 后面记得加上分页
// 3. 后期可以跟上筛选条件
router.get("/listOrders", async (ctx) => {
  const result = await order.listOrders()
  ctx.body = new JsonResp(result)
})

// 获取用户的所有订单 (客户端：个人/我的订单)
router.get("/listUserOrders", async (ctx) => {
  const result = await order.listUserOrders(ctx.state.user._id)
  ctx.body = new JsonResp(result)
})

// 修改订单：在用户项目的finish路由被触发的时候，需要判断以下，是不是全部都完成了，
// 如果是，那就将订单的isDone改为true，并且将endTime设置一下
// 完成

// 删除订单 (用户端，管理员端：都可以删除订单)
// 1. 用户可以在个人页面删除订单，然后重新订购
// 2. 记得将相关的用户项目全部删了
router.post("/del", async (ctx) => {
  const { ordId } = validate(
    ctx.request.body,
    Joi.object({
      ordId: Joi.string().required(),
    })
  )
  await order.del(ordId)
  ctx.body = new JsonResp()
})

export default router
