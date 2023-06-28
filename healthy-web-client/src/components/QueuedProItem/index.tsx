import { Button, Modal, Tag } from "antd-mobile"
import { useCallback } from "react"
import { IQueuedPro, IUserProStatus } from "../../type"
import { timeFormate } from "../../utils/time"
import styles from "./style.module.scss"

interface Props {
  queuedPro: IQueuedPro
  join: (userProId: string) => void
  pendingStatus: boolean
}

// 存档：当前完成排队和管理员端交互，未完成ws和客户端界面详情（排队中不可以参加其它项目:使用一个
// pendingStatus状态来管理，放在useHC中，join的时候就设置为真，ws接受管理端finish的时候设置为false）

export default function QueuedProItem({
  queuedPro,
  join,
  pendingStatus,
}: Props) {
  const {
    userProId,
    name,
    needEmpty,
    address,
    queueLength,
    waitingTime,
    status,
  } = queuedPro

  const rightBtnRender = useCallback(
    (status: IUserProStatus) => {
      switch (status) {
        case IUserProStatus.unfinished:
          return (
            <Button
              color='danger'
              size='mini'
              onClick={() =>
                Modal.confirm({
                  content: "确认参加吗？",
                  onConfirm: () => join(userProId),
                })
              }
              disabled={pendingStatus}
            >
              未完成
            </Button>
          )
        case IUserProStatus.pending:
          return (
            <Button color='primary' size='mini' disabled>
              排队中
            </Button>
          )
        case IUserProStatus.finished:
          return (
            <Button color='success' size='mini' disabled>
              已完成
            </Button>
          )
        default:
          return null
      }
    },
    [join, pendingStatus, userProId]
  )
  return (
    <div className={styles.queuedProItem}>
      <div className={styles.leftName}>{name}</div>
      <div className={styles.centerContent}>
        {status !== IUserProStatus.finished && (
          <div>排队人数：{queueLength} 人</div>
        )}
        {status !== IUserProStatus.finished && (
          <div>等待时间：{timeFormate(waitingTime)}</div>
        )}
        <div>地点：{address}</div>
        {needEmpty && (
          <Tag round color='#2db7f5'>
            空腹项目
          </Tag>
        )}
      </div>
      <div className={styles.rightAction}>{rightBtnRender(status)}</div>
    </div>
  )
}
