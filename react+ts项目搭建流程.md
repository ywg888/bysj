# react项目搭建流程

## 1. 创建react+ts项目

`npx create-react-app app-name --template typescript`

## 2. react脚手架创建的项目自带sass，无需安装

推荐使用module的形式引入scss文件

![image-20230407182633966](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230407182633966.png)

## 3. 使用路由

`npm i react-router-dom`

然后配置路由组件

![image-20230407193023233](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230407193023233.png)

## 4. 引入ui组件库antd

`npm i antd`

然后直接使用即可，无需下载@type/antd，antd中自带类型文件

## 5. 连接后端，解决跨域

`npm i http-proxy-middleware`

使用插件设置代理来解决跨域问题

在src文件下创建setupProxy.js文件，填写内容如下：

```js
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "http://localhost:3000", // 后台服务地址以及端口号
            changeOrigin: true, // 是否开启代理
            pathRewrite: {
                "/api": "", // 代理名称
            },
        })
    );
};
```



## 6. 二次封装axios

`npm i axios`

在src文件夹下面创建service文件夹，目录结构如下：

![image-20230408184918446](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230408184918446.png)

**request.ts文件**

```ts
// axios的二次封装
import axios from "axios"

const request = axios.create({
  baseURL: "/api",
  timeout: 6000,
})

request.interceptors.request.use((req) => {
  console.log("拦截了请求，可以设置loading等待框")
  return req
})

// 拦截响应，访问需要登录的页面需要处于登录状态，否则跳转登录页面
request.interceptors.response.use(
  (res) => {
    console.log("拦截了响应，可以配合后端来实现未登录跳转等功能")
    // 一般只在拦截的时候需要响应中的其它配置，返回出去的时候就只需要给后端返回的数据即可，所以return res.data
    return res.data
  },
  (err) => Promise.reject(err)
)

export default request
```

## 7. 其它npm包

1. `classnames` ：同时写多个class
2. `dayjs` ：日期时间处理工具
3. `antd-mobile` ：移动端ui组件库







