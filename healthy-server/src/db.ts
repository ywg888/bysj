import { MongoClient, Collection } from "mongodb"
import {
  IOrder,
  IPackage,
  IProject,
  ISession,
  IUser,
  IUserProject,
} from "./models/types"

export let users: Collection<IUser>
export let sessions: Collection<ISession>
export let projects: Collection<IProject>
export let userProjects: Collection<IUserProject>
export let packages: Collection<IPackage>
export let orders: Collection<IOrder>

export async function init() {
  const client = new MongoClient(process.env.MONGO_URL)
  await client.connect()
  const db = client.db()
  users = db.collection("users")
  sessions = db.collection("sessions")
  projects = db.collection("projects")
  userProjects = db.collection("userProjects")
  packages = db.collection("packages")
  orders = db.collection("orders")
  users.createIndex({ account: 1 }, { unique: true })
  // 设置session的sid唯一
  sessions.createIndex({ sid: 1 }, { unique: true })
  // 设置用户登录后存储在数据中的登录信息的有效时间
  sessions.createIndex(
    { createdAt: 1 },
    { expireAfterSeconds: 60 * 60 * 24 * 7 * 2 }
  )
}
