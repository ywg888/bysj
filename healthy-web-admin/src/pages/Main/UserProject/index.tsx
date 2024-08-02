import { Modal, Select, Table } from "antd"
import { useCallback, useContext, useEffect, useMemo, useState } from "react"
import useColums, { UserProDataType } from "../../../hooks/useColums"
import useUserProject from "../../../hooks/useUserProject"
import PubSub from "pubsub-js"
import { context } from "../../../hooks/store"

export default function UserProject() {
  const { userProjects, listQueuePros, finish, options } = useUserProject()
  const [currentPro, setCurrentPro] = useState(options[0]?.value)
  const { userProCols } = useColums()
  const { ws, user } = useContext(context)

  useEffect(() => {
    setCurrentPro(options[0]?.value)
  }, [options])

  // 订阅userParticipate，也就是有客户参与排队的事件
  useEffect(() => {
    const token = PubSub.subscribe(
      "userParticipate",
      (message, data: { account: string }) => {
        // 重新获取更新后的数据
        if (data.account !== user?.account) {
          listQueuePros(currentPro)
        }
      }
    )

    // 取消订阅
    return () => {
      PubSub.unsubscribe(token)
    }
  }, [currentPro, listQueuePros, user?.account, ws])
  const data: UserProDataType[] = useMemo(() => {
    return userProjects.map((userProject) => {
      return {
        ...userProject,
        key: userProject._id,
        finish: () =>
          Modal.confirm({
            title: "确认用户完成项目",
            type: "error",
            content: (
              <div>
                确认用户{userProject.account}完成 {currentPro}项目 吗？
              </div>
            ),
            onOk() {
              finish({ userProId: userProject._id })
              if (ws?.readyState === 1) {
                ws?.send(JSON.stringify({ account: user?.account }))
              }
            },
          }),
      }
    })
  }, [currentPro, finish, user?.account, userProjects, ws])
  const handleChange = useCallback(
    (value: string) => {
      setCurrentPro(value)
      listQueuePros(value)
    },
    [listQueuePros]
  )
  return (
    <div>
      <header>
        <h1>用户项目管理</h1>
        <div>
          <span>体检项目：</span>
          <Select
            defaultValue={currentPro}
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
          />
        </div>
      </header>

      <main>
        <Table columns={userProCols} dataSource={data} bordered />
      </main>
    </div>
  )
}
