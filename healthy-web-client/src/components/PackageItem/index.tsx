import { Image, Tag } from "antd-mobile"
import { RightOutline } from "antd-mobile-icons"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { IGender, IPackage } from "../../type"
import styles from "./style.module.scss"

interface Props {
  pkg: IPackage
}

export default function PackageItem({ pkg }: Props) {
  const { _id, name, avatar, gender, marriedLimit, price } = pkg
  const navigate = useNavigate()
  const tagArr = useMemo(() => {
    const arr = [{ content: "自带身份证", color: "primary" }]
    arr.push({
      content: gender === IGender.female ? "男" : "女",
      color: "#87d068",
    })
    if (marriedLimit) {
      arr.push({ content: "限已婚", color: "danger" })
    }
    return arr
  }, [gender, marriedLimit])

  return (
    <div
      className={styles.packageItem}
      onClick={() => navigate(`/main/pkgDetail/${_id}`)}
    >
      <Image src={avatar} width={100} height={120} />
      <div className={styles.content}>
        <div className={styles.name}>{name}</div>
        <div className={styles.tagBox}>
          {tagArr.map((tag) => (
            <Tag key={tag.content} color={tag.color} fill='outline'>
              {tag.content}
            </Tag>
          ))}
        </div>
        <div className={styles.price}>￥: {price}</div>
      </div>
      <RightOutline className={styles.icon} />
    </div>
  )
}
