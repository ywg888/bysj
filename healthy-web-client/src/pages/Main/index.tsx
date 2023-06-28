import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { AppOutline, AddCircleOutline, UserOutline } from "antd-mobile-icons"

import styles from "./style.module.scss"
import { TabBar } from "antd-mobile"

export default function Main() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const setRouteActive = (value: string) => {
    navigate(value)
  }
  const tabs = [
    {
      key: "/main/package",
      title: "首页",
      icon: <AppOutline />,
    },
    {
      key: "/main/hc",
      title: "体检",
      icon: <AddCircleOutline />,
    },
    {
      key: "/main/me",
      title: "我的",
      icon: <UserOutline />,
    },
  ]

  return (
    <main className={styles.main}>
      <div className={styles.content}>{<Outlet />}</div>

      {!pathname.includes("/pkgDetail") && (
        <div className={styles.bottom}>
          <TabBar
            activeKey={`${pathname}`}
            onChange={(value) => setRouteActive(value)}
          >
            {tabs.map((item) => (
              <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
            ))}
          </TabBar>
        </div>
      )}
    </main>
  )
}
