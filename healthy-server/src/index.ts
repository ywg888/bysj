import "dotenv/config"
import Koa from "koa"
import websockify from "koa-websocket"
import koaBody from "koa-body"
import checkError from "./middlewares/checkError"
import logger from "./middlewares/logger"
import * as db from "./db"
import checkToken from "./middlewares/checkToken"
import router from "./router"
import createWebsocket from "./controllers/ws"

const app = websockify(
  new Koa({
    keys: JSON.parse(process.env.KEYS),
  })
)

app.use(logger)
app.use(checkError)
app.use(koaBody())
app.use(checkToken)
app.use(router.routes())

async function run() {
  console.log("正在连接数据库......")
  await db.init()
  app.listen(process.env.PORT)
  console.log(`正在监听端口${process.env.PORT}`)
}

run()

// 创建websocket服务
createWebsocket()
