import { Avatar, Button, Modal } from "antd"
import usePerson from "../../../hooks/usePerson"
import styles from "./index.module.scss"
export default function Home() {
  const { user,logout } = usePerson()
  const defaultAvatar = require('../../../assets/imgs/12.jpg')
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
        <Avatar size={100} src={user?.avatar || defaultAvatar} />
        <h2>昵称：{user?.nickname || '无名'}</h2>
        <span>个人介绍：{user?.introduce || '这个人很懒，没留下任何痕迹~'}</span>
        <span style={{color: 'red'}}>本产品使用指南：先添加项目，再添加套餐~</span>
      </main>
    </div>
  )
}
