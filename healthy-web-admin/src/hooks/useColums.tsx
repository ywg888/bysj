import { IGender, IPackage, IProject } from "../type"
import { ColumnsType } from "antd/es/table"
import { Button, Space, Typography } from "antd"
import { useContext } from "react"
import { context } from "./store"
import { IListOrdersResp, IListQueueProsResp } from "../service/types/respType"
import { timeFormate } from "../utils/time"
import dayjs from "dayjs"

// 项目管理列表项
export interface ProDataType extends IProject {
  key: string
  del: () => void
  edit: () => void
}

// 套餐管理列表项
export interface PkgDataType extends IPackage {
  key: string
  del: () => void
  edit: () => void
}

// 订单管理列表项
export interface OrdDatatype extends IListOrdersResp {
  key: string
  del: () => void
}

// 用户体检项目列表项
export interface UserProDataType extends IListQueueProsResp {
  key: string
  finish: () => void
}

const { Text } = Typography

export default function useColums() {
  const { projectMap } = useContext(context)
  const projectCols: ColumnsType<ProDataType> = [
    {
      title: "序号",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: "项目名",
      dataIndex: "name",
    },
    {
      title: "预计时间/秒",
      dataIndex: "duration",
      // 这里用dayjs处理
      render: (duration) => <div>{timeFormate(duration)}</div>,
    },
    {
      title: "地点",
      dataIndex: "address",
    },
    {
      title: "空腹项目",
      dataIndex: "needEmpty",
      render: (needEmpty) => <div>{needEmpty ? "yes" : "no"}</div>,
    },
    {
      title: "介绍",
      dataIndex: "introduce",
    },
    {
      title: "Action",
      key: "action",
      render: (name) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => name.edit()}>
            修改
          </Button>
          <Button onClick={() => name.del()}>删除</Button>
        </Space>
      ),
    },
  ]

  const packageCols: ColumnsType<PkgDataType> = [
    {
      title: "序号",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: "套餐名",
      dataIndex: "name",
      render: (name) => (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: name }}>
          {name}
        </Text>
      ),
    },
    {
      title: "头像",
      dataIndex: "avatar",
      render: (avatar) => (
        <img
          src={`${avatar}?x-oss-process=image/resize,m_lfit,h_100,w_100`}
          alt=''
          width={50}
        />
      ),
    },
    {
      title: "背景",
      dataIndex: "banner",
      render: (banner) => (
        <img
          src={`${banner}?x-oss-process=image/resize,m_lfit,h_100,w_100`}
          alt=''
          width={50}
        />
      ),
    },
    {
      title: "性别",
      dataIndex: "gender",
      render: (gender) => (
        <div>
          {gender === IGender.male && "男"}
          {gender === IGender.female && "女"}
        </div>
      ),
    },
    {
      title: "已婚限制",
      dataIndex: "marriedLimit",
      render: (marriedLimit) => <div>{marriedLimit ? "yes" : "no"}</div>,
    },
    {
      title: "介绍",
      dataIndex: "introduce",
      render: (introduce) => (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: introduce }}>
          {introduce}
        </Text>
      ),
    },
    {
      title: "价格/元",
      dataIndex: "price",
    },
    {
      title: "项目",
      dataIndex: "proIds",
      render: (proIds: string[]) => {
        const projectNames = proIds.map((item1) => {
          return projectMap.find((item2) => item2._id === item1)?.name
        })
        const projectStr = projectNames.join("  ")
        return (
          <Text style={{ width: 100 }} ellipsis={{ tooltip: projectStr }}>
            {projectStr}
          </Text>
        )
      },
    },
    {
      title: "Action",
      key: "action",
      render: (name) => (
        <Space size='middle'>
          <Button type='primary' onClick={() => name.edit()}>
            修改
          </Button>
          <Button onClick={() => name.del()}>删除</Button>
        </Space>
      ),
    },
  ]

  const orderCols: ColumnsType<OrdDatatype> = [
    {
      title: "序号",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: "用户名",
      dataIndex: "account",
      render: (account) => (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: account }}>
          {account}
        </Text>
      ),
    },
    {
      title: "套餐名",
      dataIndex: "name",
      render: (name) => (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: name }}>
          {name}
        </Text>
      ),
    },
    {
      title: "下单时间",
      dataIndex: "createdAt",
      // 用dayjs转换
      render: (createdAt) => (
        <div>{dayjs(createdAt).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      title: "完成时间",
      dataIndex: "endAt",
      render: (endAt) => (
        <div>
          {endAt === -1 ? "-" : dayjs(endAt).format("YYYY-MM-DD HH:mm:ss")}
        </div>
      ),
    },
    {
      title: "完成情况",
      dataIndex: "isDone",
      render: (isDone) => <div>{isDone ? "已完成" : "未完成"}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (name) => (
        <Space size='middle'>
          <Button onClick={() => name.del()}>删除</Button>
        </Space>
      ),
    },
  ]

  const userProCols: ColumnsType<UserProDataType> = [
    {
      title: "序号",
      render: (_, __, index) => <div>{index + 1}</div>,
    },
    {
      title: "用户名",
      dataIndex: "account",
      render: (account) => (
        <Text style={{ width: 100 }} ellipsis={{ tooltip: account }}>
          {account}
        </Text>
      ),
    },
    {
      title: "参加时间",
      dataIndex: "joinAt",
      // 用dayjs转换
      render: (joinAt) => (
        <div>{dayjs(joinAt).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (name, _, index) => (
        <Space size='middle'>
          <Button
            type='primary'
            disabled={index !== 0}
            onClick={() => name.finish()}
          >
            确认
          </Button>
        </Space>
      ),
    },
  ]
  return { projectCols, packageCols, orderCols, userProCols }
}
