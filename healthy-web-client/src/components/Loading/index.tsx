import { Mask, SpinLoading } from "antd-mobile"
import styles from "./style.module.scss"

interface Props {
  content: string
  visivle: boolean
}

export default function Loading({ content, visivle }: Props) {
  return (
    <Mask visible={visivle}>
      <div className={styles.loadingBox}>
        <div className={styles.overlayContent}>
          <SpinLoading color='black' style={{ "--size": "48px" }} />
          <span>{content}</span>
        </div>
      </div>
    </Mask>
  )
}
