import { ReactElement } from "react"
import styles from "./index.module.scss"

interface IProps {
  leftSearch?: ReactElement
  rightAdd?: ReactElement
}

export default function TopActionBar(props: IProps): ReactElement {
  const { leftSearch, rightAdd } = props
  return (
    <div className={styles.topActionBar}>
      <div className={styles.left}>{leftSearch}</div>
      <div className={styles.right}>{rightAdd}</div>
    </div>
  )
}
