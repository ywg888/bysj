import { Avatar, ErrorBlock, NavBar, NoticeBar } from "antd-mobile"
import { useContext, useEffect, useMemo, useRef } from "react"
import { useNavigate } from "react-router-dom"
import QuequedProItem from "../../../components/QueuedProItem"
import useHC from "../../../hooks/useHC"
import { IUserProStatus } from "../../../type"
import styles from "./style.module.scss"
import PubSub from "pubsub-js"
import { context } from "../../../hooks/store"
import { alertTextArr } from "../../../lib"

const longText = alertTextArr.join(' ')

export default function HealthCheckup() {
  const { pkgName, queuedPros, listUserPros, join } = useHC()
  const { user, ws } = useContext(context)
  // 防抖
  const refTimer = useRef<NodeJS.Timeout>()
  const delay = 300

  const naviagte = useNavigate()
  const pendingStatus = useMemo(
    () => queuedPros.some((item) => item.status === IUserProStatus.pending),
    [queuedPros]
  )

  // 订阅joinOrFinishPro，也就是排队信息变化事件
  useEffect(() => {
    const token = PubSub.subscribe(
      "joinOrFinishPro",
      (message, data: { account: string }) => {
        // 重新获取更新后的数据
        if (data.account !== user?.account) {
          // 对请求进行防抖处理
          if (refTimer.current) {
            clearTimeout(refTimer.current)
          }
          refTimer.current = setTimeout(() => {
            listUserPros()
          }, delay)
        }
      }
    )

    // 取消订阅
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [listUserPros, user?.account])
  return (
    <div className={styles.healthyCheckup}>
      <nav className={styles.nav}>
        <NavBar
          onBack={() => naviagte("/main/me")}
          backArrow={
            <Avatar
              className={styles.avatar}
              src={user?.avatar as string}
            ></Avatar>
          }
        >
          {pkgName ? pkgName : "体检"}
        </NavBar>
        <NoticeBar content={longText} color='info' />
      </nav>
      <main className={styles.main}>
        {queuedPros.length > 0 ? (
          <div className={styles.queuedProsContainer}>
            {queuedPros.map((item) => (
              <QuequedProItem
                queuedPro={item}
                join={(userProId: string) => {
                  join({ userProId })
                  if (ws?.readyState === 1) {
                    ws?.send(JSON.stringify({ account: user?.account }))
                  }
                }}
                pendingStatus={pendingStatus}
                key={item.name}
              />
            ))}
          </div>
        ) : (
          <ErrorBlock
            status='empty'
            description=''
            fullPage
            title={
              <div style={{ fontSize: 16, color: "#999" }}>
                还没有订单，前往
                <span
                  style={{ color: "#5d96fe", margin: "0 6px", fontSize: 18 }}
                  onClick={() => naviagte("/main")}
                >
                  首页
                </span>
                下单吧
              </div>
            }
          />
        )}
      </main>
    </div>
  )
}
