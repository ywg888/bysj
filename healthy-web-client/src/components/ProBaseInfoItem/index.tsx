import { IProIntroduceItem } from "../../service/types/respType"
import styles from "./style.module.scss"

interface IProps {
  proBaseInfo: IProIntroduceItem
}

export default function ProBaseInfoItem({ proBaseInfo }: IProps) {
  const { name, introduce } = proBaseInfo
  return (
    <div className={styles.baseInfoItem}>
      <div className={styles.leftName}>{name}</div>
      <div className={styles.rightIntroduce}>
        {introduce}
      </div>
    </div>
  )
}
