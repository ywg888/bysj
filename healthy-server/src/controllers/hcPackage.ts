import Joi, { string } from "joi"
import Router from "koa-router"
import { JsonResp } from "../libs/stats"
import validate from "../libs/validate"
import * as hcPackage from "../services/hcPackage"

const router = new Router({
  prefix: "/api/hcPackage",
})

// 添加套餐
router.post("/add", async (ctx) => {
  const {
    name,
    avatar,
    banner,
    gender,
    marriedLimit,
    introduce,
    price,
    proIds,
  } = validate(
    ctx.request.body,
    Joi.object({
      name: Joi.string().required(),
      avatar: Joi.string().allow("").required(),
      banner: Joi.string().allow("").required(),
      gender: Joi.number().required(),
      marriedLimit: Joi.boolean().required(),
      introduce: Joi.string().max(400).required(),
      price: Joi.number().required(),
      // 套餐中项目个数不得少于1
      proIds: Joi.array().min(1).required(),
    })
  )

  const result = await hcPackage.add({
    name,
    avatar,
    banner,
    gender,
    marriedLimit,
    introduce,
    price,
    proIds,
  })
  ctx.body = new JsonResp(result)
})

// 查询所有套餐 (管理员端和客户端都可以用)
// 1.后续考虑补上价格升降序条件
router.get("/listAll", async (ctx) => {
  const { gender, marriedLimit } = validate(
    ctx.query,
    Joi.object({
      gender: Joi.number(),
      marriedLimit: Joi.boolean(),
    })
  )
  const result = await hcPackage.listAll({
    gender,
    marriedLimit,
  })
  ctx.body = new JsonResp(result)
})

// 获取某个套餐的详细信息：套餐的信息，关联的项目的信息（客户端：首页/套餐详情页）
router.get("/getDetail", async (ctx) => {
  const { pkgId } = validate(
    ctx.query,
    Joi.object({
      pkgId: Joi.string().required(),
    })
  )
  const result = await hcPackage.getDetail(pkgId)
  ctx.body = new JsonResp(result)
})

// 修改套餐
router.post("/edit", async (ctx) => {
  const {
    name,
    avatar,
    banner,
    gender,
    marriedLimit,
    introduce,
    price,
    proIds,
    pkgId,
  } = validate(
    ctx.request.body,
    Joi.object({
      pkgId: Joi.string().required(),
      name: Joi.string().max(20).required(),
      avatar: Joi.string().allow("").required(),
      banner: Joi.string().allow("").required(),
      gender: Joi.number(),
      marriedLimit: Joi.boolean().required(),
      introduce: Joi.string().required(),
      price: Joi.number().required(),
      proIds: Joi.array().min(1).required(),
    })
  )
  await hcPackage.edit({
    name,
    avatar,
    banner,
    gender,
    marriedLimit,
    introduce,
    price,
    proIds,
    pkgId,
  })
  ctx.body = new JsonResp()
})

// 删除套餐
router.post("/del", async (ctx) => {
  const { pkgId } = validate(
    ctx.request.body,
    Joi.object({
      pkgId: Joi.string().required(),
    })
  )
  await hcPackage.del(pkgId)
  ctx.body = new JsonResp()
})

export default router
