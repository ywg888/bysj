import WebSocket from "ws"

// wss.clients可以获取所有的连接客户端，
// 客户端通过ws发送数据需要添加字段account来标明自己的身份(为后期识别自己做准备)

export default function createWebsocket() {
  const wss = new WebSocket.Server({ port: +process.env.WX_PORT })
  wss.on("connection", (client) => {
    console.log("有用户连接了")
    client.on("message", (msg) => {
      // 延迟防止获取未更新的数据
      setTimeout(() => {
        wss.clients.forEach((item) => {
          item.send(msg)
        })
      }, 500)
    })
  })
}
