import styles from "./style.module.scss"
import { ReactComponent as Icon } from "../../assets/imgs/#.svg"
import { ReactComponent as Wx } from "../../assets/imgs/wx.svg"
import { Image } from "antd-mobile"
import qrCode from "../../assets/imgs/qrCode.jpg"
import { useState } from "react"

export default function Login() {
  const [visible, setVisible] = useState(false)
  // 微信工作平台测试号的appID
  const APPID = "wx4068bd3a6377f0cd"  
  // 微信授权后的重定向地址
  const redirectUrl = `http://127.0.0.1:4015/api/user/wxAuthorize`
  // 拼接好的微信授权路径
  const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`

  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <Icon />
      </div>
      <Wx
        className={styles.wx}
        onClick={() => {
          window.location.href = url
        }}
      />
      <span className={styles["bottom-tips"]}>
        还未关注公众号？
        <span
          className={styles.scanCode}
          onClick={() => {
            setVisible(true)
          }}
        >
          扫码关注
        </span>
      </span>
      {visible ? (
        <div className={styles.mask} onClick={() => setVisible(false)}>
          <Image src={qrCode} width={"300px"} />
        </div>
      ) : null}
    </div>
  )
}
