# 启动流程

1. 创建名为 `.env` 的配置文件，配置信息在下面（由于配置文件中含有密钥等不可泄漏的信息，所以就忽略上传git了）
2. `npm i` ：安装依赖包
3. `npm start`  ：启动项目



+ `.env`

```json
# 后端端口
PORT=4015
# mongodb数据库地址
MONGO_URL=mongodb://127.0.0.1:27017/feed-submit
# 加密cookie的随机字符串
KEYS=["1aba0a6cd04f1a58f904bfc55c6d46b1a4105fed23e7643a0b40992737d55ecc"]

# 微信公众平台测试号appID
APPID = wx4068bd3a6377f0cd
# 微信公众平台测试号appsecret
APPSECRET = 3dd566748ed79e3e8216d1930050ae6c

# 阿里云访问键id
ACCESSKEYID = LTAI5tLARXYdXBr4CwQ2s16j
# 阿里云访问键密钥(不能公开)
ACCESSKEYSECRET = 4rRrKRNreQYuuOiIG2wlUl6GapERSU

```


## tips
+ 套餐的删除用到的是逻辑删除(软删除)，可以防止删除套餐之后用户的订单出现问题（在一段时间后，可以人工维护，在数据库中删除真实套餐数据）
+ 



## 注意
+ 项目中的一个重点在于数据的一致性问题：
1. 删除项目要将套餐同步修改；
2. 删除套餐需要用到逻辑删除，避免用户的订单还没完成就无法使用了。





+ 需要注意的是：不能添加同名项目

