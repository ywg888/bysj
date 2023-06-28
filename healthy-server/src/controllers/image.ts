import OSS from "ali-oss"
import Router from "koa-router"
import { JsonResp } from "../libs/stats"

const router = new Router({
  prefix: "/api/image",
})

let client = new OSS({
  region: "oss-cn-nanjing",
  accessKeyId: process.env.ACCESSKEYID,
  accessKeySecret: process.env.ACCESSKEYSECRET,
  bucket: "yangwenguang",
})

// 上传图片
router.post("/upload", async (ctx) => {
  const urlname = Date.now() + ".jpg"
  const url = client.signatureUrl("zntj/" + urlname, {
    // 设置过期时间，默认值为1800秒。
    expires: 600,
    // 设置请求方式为PUT。默认请求方式为GET。
    method: "PUT",
    "Content-Type": "image/jpg",
  })
  ctx.body = new JsonResp({ url })
})

export default router
