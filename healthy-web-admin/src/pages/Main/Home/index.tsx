import { Avatar, Button, Modal } from "antd"
import usePerson from "../../../hooks/usePerson"
import styles from "./index.module.scss"
export default function Home() {
  const { user,logout } = usePerson()
  return (
    <div className={styles.home}>
      <header className={styles.header}>
        <h1>首页，欢迎{user?.nickname}</h1>
        <Button
          type='default'
          danger
          onClick={() =>
            Modal.confirm({ title: "确认退出登录吗", onOk: logout })
          }
        >
          退出登录
        </Button>
      </header>
      <main className={styles.main}>
        <Avatar size={100} src={user?.avatar} />
        <h2>昵称：{user?.nickname}</h2>
        <span>个人介绍：{user?.introduce}</span>
      </main>
    </div>
  )
}
