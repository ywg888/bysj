# websocket的使用

## 1. 先安装包

`npm i ws` ：默认安装-save，生成模式依赖

`npm i --save-dev @types/ws` ： 指定为开发模式依赖

## 2. 简单例子

### 后端

```ts
const wss = new WebSocket.Server({ port: 9999 })
wss.on("connection", (client) => {
  console.log("有客户端连接成功")
  client.on("message", (msg) => {
    console.log("客户端给服务端发送数据了：" + msg)
    client.send("服务端接受到了你发的数据，返回给你一个666")
  })
})
```

### 前端

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>websocket test</title>
</head>

<body>
  <button class="btn1">建立websocket连接</button>
  <button class="btn2">发送数据：你好，我叫ywg</button>
  <hr>
  <h3>服务端发来了如下数据：</h3>
  <span></span>
</body>
<script>
  const btn1 = document.querySelector(".btn1")
  const btn2 = document.querySelector(".btn2")
  const span = document.querySelector("span")
  let ws
  btn1.addEventListener('click', () => {
    ws = new WebSocket('ws://127.0.0.1:9999')
    ws.onopen = () => {
      console.log("连接服务器成功")
    }
    ws.onclose = () => {
      console.log("连接服务器失败")
    }
    ws.onmessage = msg => {
      console.log("接受到服务器传来的数据：")
      const { data } = msg
      span.innerText = data
    }
  })
  btn2.addEventListener('click', () => {
    ws.send('你好，我叫ywg')
  })
</script>

</html>
```

### 结果

![image-20230412163258147](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230412163258147.png)



![image-20230412163240965](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230412163240965.png)