import { useCallback, useContext, useEffect, useState } from "react"
import { context } from "./store"

export enum IWsSendType {
  connect = 1,
  sendData = 2,
}

export interface IWsSend<T = any> {
  type: IWsSendType
  data?: T
}

// 封装send函数，重连
export default function useWebsocket() {
  const { ws, setWs, user } = useContext(context)
  const [connected, setConnected] = useState<boolean>(false)

  // 发送数据
  const send = useCallback(
    (param: IWsSend) => {
      if (connected) {
        ws?.send(JSON.stringify({ ...param, account: user?.account || "" }))
      } else {
        // 没有连接那就延迟发送数据，每隔0.5s重发
        setTimeout(() => {
          send(param)
        }, 500)
      }
    },
    [connected, user?.account, ws]
  )

  // 创建ws连接服务器
  const connect = useCallback(() => {
    if (!ws) {
      const webSocket = new WebSocket("ws://127.0.0.1:9999")

      // 建立ws长连接
      webSocket.onopen = () => {
        console.log("建立ws长连接")
        setConnected(true)
      }

      // 连接服务器失败
      webSocket.onclose = () => {
        console.log("连接服务器失败")
        setConnected(false)
        // 每隔0.5s重连
        // setTimeout(() => {
        //   connect()
        // }, 500)
      }

      // 收到消息
      webSocket.onmessage = (e) => {
        console.log('客户端aaa')
        const reader = new FileReader()
        reader.readAsText(e.data, "UTF-8")
        reader.onload = () => PubSub.publish("joinOrFinishPro", reader.result)
      }

      setWs(webSocket)
    }
  }, [setWs, ws])

  useEffect(() => {
    connect()
    // 向ws服务器发送数据标明身份
    send({ type: IWsSendType.connect })
  }, [connect, send])

  // return { ws, user, connected, send }
}
