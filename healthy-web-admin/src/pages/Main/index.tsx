import { CloudOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Layout, Menu } from "antd"
import React from "react"
import { Outlet, useNavigate } from "react-router-dom"

const { Content, Sider } = Layout

type MenuItem = Required<MenuProps>["items"][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem("欢迎", "home", <UserOutlined />),
  getItem("用户项目管理", "userProject", <UserOutlined />),
  getItem("订单管理", "order", <UserOutlined />),
  getItem("项目管理", "project", <UserOutlined />),
  getItem("套餐管理", "package", <TeamOutlined />),
  getItem("Other", "other", <CloudOutlined />),
]

export default function Main() {
  const navigate = useNavigate()

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className='logo' />
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[""]}
          items={items}
          onClick={(e) => {
            navigate(e.key)
          }}
        />
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Content
          style={{
            margin: "24px 16px",
            overflow: "initial",
            minHeight: "calc(100vh - 48px)",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
