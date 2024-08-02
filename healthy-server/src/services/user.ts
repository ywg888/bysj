import { ISession, IUser } from "../models/types"
import * as db from "../db"
import * as crypto from "crypto"
import * as https from "https"
import { stats } from "../libs/stats"

/**
 * 微信授权
 * @param code
 */
export async function wxAuthorize(code: string) {
  // 通过code换取网页授权access_token
  let resObj = (await getAccessToken(code)) as any
  const { access_token, openid } = resObj
  // 拉取用户信息
  let userObj = await getWxUserInfo(access_token, openid)
  // 判断用户是否未第一次登录(用户表中是否有当前的用户信息)
  let user = await db.users.findOne({ openid })
  if (!user) return { userObj, status: 1 }
  return { userObj, status: 0 }
}

function getAccessToken(code: string) {
  return new Promise((resolve) => {
    const getAccessTokenUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${process.env.APPID}&secret=${process.env.APPSECRET}&code=${code}&grant_type=authorization_code`
    https
      .get(getAccessTokenUrl, (res) => {
        let resText = ""
        res.on("data", (data) => {
          resText += data
        })
        res.on("end", () => {
          resolve(JSON.parse(resText))
        })
      })
      .on("error", (e) => console.error(e))
  })
}

function getWxUserInfo(access_token: string, openid: string) {
  return new Promise((resolve) => {
    let getUserInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
    https
      .get(getUserInfoUrl, (res) => {
        let resText = ""
        res.on("data", (data) => {
          resText += data
        })
        res.on("end", () => {
          resolve(JSON.parse(resText))
        })
      })
      .on("error", (e) => console.error(e))
  })
}

/**
 * 创建session
 * @param openid
 * @param ip
 */
export async function createSession(openid: string, ip: string) {
  if (!openid) throw stats.ErrWeChatWithoutAuthorization
  const user = await db.users.findOne({
    openid,
  })
  const sid = crypto.randomBytes(12).toString("hex")
  const session = { sid, uid: user._id, ip, createdAt: new Date() } as ISession
  await db.sessions.insertOne(session)
  return sid
}

/**
 * 注册用户
 * @param account
 * @param openid
 * @param nickname
 * @param avatar
 */
export async function create(
  account: string,
  openid: string,
  nickname: string,
  avatar: string
) {
  if (!openid) throw stats.ErrWeChatWithoutAuthorization
  const findUser = await db.users.findOne({ account })
  if (findUser) throw stats.ErrAccountExists
  const user = {
    openid,
    avatar,
    banner: "",
    account,
    nickname,
    createdAt: Date.now(),
    introduce: "",
  } as IUser
  await db.users.insertOne(user)
}

/**
 * 退出登录
 */
export async function logout(token: string) {
  const result = await db.sessions.findOneAndDelete({
    sid: token,
  })
  if (!result.value) throw stats.ErrUserNotLogin
}

/**
 * 编辑用户信息
 * @param nickname
 * @param avatar
 * @param banner
 * @param introduce
 * @param account
 */
export async function editUser(
  nickname: string,
  avatar: string,
  banner: string,
  introduce: string,
  account: string
) {
  await db.users.updateOne(
    { account },
    { $set: { nickname, avatar, banner, introduce } }
  )
}

/**
 * 获取用户信息
 * @param account
 */
export async function getUserInfo(account: string) {
  let user = await db.users.findOne(
    { account },
    { projection: { _id: 0, openid: 0 } }
  )
  if (!user) throw stats.ErrUserNotExists
  return user
}

export async function adminLogin(
  account: string,
  password: string,
  ip: string
) {
  const user = await db.users.findOne({ account })
  if (!user) throw stats.ErrUserNotExists
  if (user.password !== password) throw stats.ErrPassword
  const sid = crypto.randomBytes(12).toString("hex")
  const session = {
    sid,
    uid: user._id,
    ip,
    createdAt: new Date(),
  } as ISession
  await db.sessions.insertOne(session)
  return sid
}

export async function adminRegist(
  account: string,
  password: string,
) {
  const findUser = await db.users.findOne({ account })
  if (findUser) throw stats.ErrAccountExists
  const user = {
    openid: '',
    avatar: '',
    banner: "",
    account,
    password,
    nickname: '',
    createdAt: Date.now(),
    introduce: "",
  } as IUser
  await db.users.insertOne(user)
}
