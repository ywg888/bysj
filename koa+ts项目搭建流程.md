# koa2+ts项目搭建流程

## 1. 初始化项目

`npm init --yes`

## 2. 下载依赖如下

```json
{
  "name": "koa-demo",
  "version": "0.1.0",
  "description": "koa demo app",
  "main": "index.js",
  "license": "MIT",
  "scripts": {
    "start": "ts-node src/index.ts",
    "dev": "tsc -w"
  },
  "dependencies": {
    "dayjs": "^1.11.3",
    "dotenv": "^16.0.1",
    "joi": "^17.6.0",
    "koa": "^2.13.4",
    "koa-body": "^5.0.0",
    "koa-router": "^11.0.1",
    "mongodb": "^4.7.0"
  },
  "devDependencies": {
    "@types/koa": "^2.13.4",
    "@types/koa-router": "^7.4.4"
  }
}
```

`npm i`

## 3. 创建如下目录结构

![image-20230412155745706](C:\Users\Admin\AppData\Roaming\Typora\typora-user-images\image-20230412155745706.png)

**说明：**

+ tsconfig.json自己需要配置ts
+ .env的使用需要安装`dotenv`：可以让其中的配置加载到process中，然后就可以在任意文件中通过process.env使用
+ 遵循MVC开发模式：该服务端包含M（model：模型）C（control：控制）。这里需要注意的是：C层中我们将其细分为controllers和services两个文件夹，分别控制路由和实际业务，方便复用，逻辑清晰，便于维护



## 4. 