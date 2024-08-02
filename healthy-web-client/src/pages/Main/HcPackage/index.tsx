import { Avatar, Image, NavBar, Swiper } from "antd-mobile"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import PackageItem from "../../../components/PackageItem"
import { context } from "../../../hooks/store"
import useHcPackage from "../../../hooks/useHcPackage"
import styles from "./style.module.scss"

const imgs = [
  require("../../../assets/imgs/slider-01.jpg"),
  require("../../../assets/imgs/slider-02.jpg"),
  require("../../../assets/imgs/slider-03.jpg"),
  require("../../../assets/imgs/slider-04.jpg"),
]
export default function HcPackage() {
  const { packages } = useHcPackage()
  const { user } = useContext(context)
  const naviagte = useNavigate()
  const items = imgs.map((img, index) => (
    <Swiper.Item key={index}>
      <Image src={img} height={150} fit='cover' />
    </Swiper.Item>
  ))
  return (
    <div className={styles.hcPackage}>
      <nav>
        <NavBar
          onBack={() => naviagte("/main/me")}
          backArrow={
            <Avatar
              className={styles.avatar}
              src={user?.avatar as string}
            ></Avatar>
          }
        >
          Healthy App
        </NavBar>
      </nav>
      <main className={styles.main}>
        <Swiper loop autoplay>
          {items}
        </Swiper>
        {packages.map((item) => (
          <PackageItem pkg={item} key={item._id} />
        ))}
      </main>
    </div>
  )
}
