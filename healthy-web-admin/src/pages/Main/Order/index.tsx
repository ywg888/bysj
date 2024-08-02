import { Input, Modal, Table } from "antd"
import { useMemo } from "react"
import TopActionBar from "../../../components/TopActionBar"
import useColums, { OrdDatatype } from "../../../hooks/useColums"
import useOrder from "../../../hooks/useOrder"

export default function Order() {
  const { orders, del } = useOrder()
  const { orderCols } = useColums()

  const data: OrdDatatype[] = useMemo(() => {
    return orders.map((order) => {
      return {
        ...order,
        key: order._id,
        del: () =>
          Modal.confirm({
            title: "删除项目",
            type: "error",
            content: <div>确认删除吗？</div>,
            onOk() {
              del({ ordId: order._id })
            },
          }),
      }
    })
  }, [del, orders])

  // 搜索
  const onSearch = async (value: string) => {
    console.log("你好", value)
  }

  return (
    <div className='order'>
      <header>
        <h1>订单管理</h1>
        <TopActionBar
          leftSearch={
            <Input.Search
              placeholder='输入订单者的姓名'
              onSearch={onSearch}
              enterButton
            />
          }
        />
      </header>
      <main>
        <Table columns={orderCols} dataSource={data} bordered />
      </main>
    </div>
  )
}
