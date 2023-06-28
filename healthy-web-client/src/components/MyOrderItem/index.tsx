import { List, Tag } from "antd-mobile"
import { IListOrdersResp } from "../../service/types/respType"
import styles from "./style.module.scss"

interface Props {
  order: IListOrdersResp
}

export default function MyOrderItem({ order }: Props) {
  const { isDone, createdAt, endAt, name } = order

  return (
    <List.Item
      className={styles.myOrderItem}
      description={
        <div>
          <p>下单时间：{createdAt}</p>
          {isDone && <p>完成时间：{endAt}</p>}
        </div>
      }
      extra={
        isDone ? (
          <Tag color='success'>已完成</Tag>
        ) : (
          <Tag color='danger'>未完成</Tag>
        )
      }
    >
      {name}
    </List.Item>
  )
}
