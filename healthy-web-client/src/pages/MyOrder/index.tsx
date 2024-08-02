import { List, NavBar } from "antd-mobile"
import { useNavigate } from "react-router-dom"
import MyOrderItem from "../../components/MyOrderItem"
import useOrder from "../../hooks/useOrder"
import styles from "./style.module.scss"

export default function MyOrder() {
  const navigate = useNavigate()
  const { orders } = useOrder()
  return (
    <div className={styles.myOrder}>
      <nav className={styles.nav}>
        <NavBar onBack={() => navigate(-1)}>我的订单</NavBar>
      </nav>
      <main>
        <List style={{marginTop:10}} mode='card'>
          {orders.reverse().map((item) => (
            <MyOrderItem order={item} key={item._id} />
          ))}
        </List>
      </main>
    </div>
  )
}
