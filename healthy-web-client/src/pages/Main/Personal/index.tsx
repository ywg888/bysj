import { Avatar, List, Modal, Toast } from "antd-mobile"
import {
  PhonebookOutline,
  SetOutline,
  UnorderedListOutline,
  UserSetOutline,
} from "antd-mobile-icons"
import { useNavigate } from "react-router-dom"
import usePerson from "../../../hooks/usePerson"
import styles from "./style.module.scss"

export default function Personal() {
  const { logout, user } = usePerson()
  const navigate = useNavigate()
  return (
    <div className={styles.personal}>
      <header className={styles.header}>
        <div className={styles.leftAvatar}>
          <Avatar
            src={user?.avatar as string}
            style={{ width: 50, height: 50 }}
          />
        </div>
        <div className={styles.rightPersonalInfo}>
          <h2 className={styles.nickname}>{user?.nickname}</h2>
          <div className={styles.account}>账号：{user?.account}</div>
          <div className={styles.introduce}>
            个人介绍：{user?.introduce ? user?.introduce : "这个人很懒，没留下任何信息~"}
          </div>
        </div>
      </header>
      <main>
        <List style={{ marginTop: 10 }}>
          <List.Item
            prefix={<UnorderedListOutline />}
            onClick={() => {
              navigate("/myOrder")
            }}
          >
            我的订单
          </List.Item>
          <List.Item
            prefix={<UserSetOutline />}
            onClick={() => {
              Toast.show("正在开发...")
            }}
          >
            修改资料
          </List.Item>
          <List.Item
            prefix={<PhonebookOutline />}
            onClick={() => {
              Modal.alert({ content: "联系电话：15027154492" })
            }}
          >
            联系客服
          </List.Item>
        </List>
        <List style={{ marginTop: 10 }}>
          <List.Item
            prefix={<SetOutline />}
            onClick={() => {
              Modal.confirm({
                content: "您确认要退出登录吗?",
                onConfirm: logout,
              })
            }}
          >
            退出登录
          </List.Item>
        </List>
      </main>
      {/* <Button color='danger' onClick={logout}>
        退出登录
      </Button>
      <Button
        onClick={() => {
          console.log(user)
        }}
      >
        展示user
      </Button> */}
    </div>
  )
}
