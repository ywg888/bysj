import Joi from "joi"
import Router from "koa-router"
import { JsonResp } from "../libs/stats"
import validate from "../libs/validate"
import * as project from "../services/project"

const router = new Router({
  prefix: "/api/project",
})

router.post("/add", async (ctx) => {
  const { name, duration, introduce, address, needEmpty } = validate(
    ctx.request.body,
    Joi.object({
      name: Joi.string().max(20).required(),
      duration: Joi.number().required(),
      introduce: Joi.string().required(),
      address: Joi.string().required(),
      needEmpty: Joi.boolean().required(),
    })
  )
  const result = await project.add(
    name,
    duration,
    introduce,
    address,
    needEmpty
  )
  ctx.body = new JsonResp(result)
})

// 获取所有项目类型  (管理员端：项目管理页面)
// 1. 后期需要加上分页
router.get("/listPros", async (ctx) => {
  const result = await project.listPros()
  ctx.body = new JsonResp(result)
})

router.post("/edit", async (ctx) => {
  const { proId, name, duration, introduce, address, needEmpty } = validate(
    ctx.request.body,
    Joi.object({
      proId: Joi.string().required(),
      name: Joi.string().max(20).required(),
      duration: Joi.number().required(),
      introduce: Joi.string().required(),
      address: Joi.string().required(),
      needEmpty: Joi.boolean().required(),
    })
  )
  await project.edit(proId, name, duration, introduce, address, needEmpty)
  ctx.body = new JsonResp()
})

router.post("/del", async (ctx) => {
  const { proId } = validate(
    ctx.request.body,
    Joi.object({
      proId: Joi.string().required(),
    })
  )
  await project.del(proId)
  ctx.body = new JsonResp()
})

export default router
