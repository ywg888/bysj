import { Avatar, Input } from "antd-mobile"
import { useState } from "react"

import { ReactComponent as Icon } from "../../assets/imgs/#.svg"
import Loading from "../../components/Loading"
import usePerson from "../../hooks/usePerson"
import styles from "./style.module.scss"

export default function Register() {
  const [value, setValue] = useState("")
  const { baseInfo, register, loading } = usePerson()

  return (
    <div className={styles.container}>
      <Loading content='注册中...' visivle={loading} />
      <div className={styles.icon}>
        <Icon />
      </div>
      <div className={styles.avatar}>
        <Avatar src={baseInfo?.headimgurl!} />
      </div>
      <div className={styles.name}>{baseInfo?.nickname!}</div>
      <div className={styles.input}>
        <div className={styles.search}>@</div>
        <Input onChange={(val) => setValue(val)}></Input>
      </div>
      <div
        className={styles.btn}
        onClick={() => {
          register(value, baseInfo?.id!)
        }}
      >
        注册
      </div>
    </div>
  )
}
