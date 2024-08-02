import { CapsuleTabs, Image, Modal, NavBar } from "antd-mobile"
import { MessageOutline, UserOutline } from "antd-mobile-icons"
import { ReactElement, useMemo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ProBaseInfoItem from "../../../components/ProBaseInfoItem"
import usePkgDetail from "../../../hooks/usePkgDetail"
import { hcInstructions } from "../../../lib"
import { IGender } from "../../../type"
import styles from "./style.module.scss"

export default function HcPackageDetail() {
  const { pkgId } = useParams()
  const { hcPackage, proIntroduces, addOrder } = usePkgDetail(pkgId as string)
  const proCount = useMemo(() => proIntroduces.length, [proIntroduces.length])
  const navigate = useNavigate()

  const renderDetailItem = (
    leftIcon: ReactElement,
    rightTitle: string,
    rightContent: string
  ) => (
    <div className={styles.detailItem}>
      <div className={styles.leftIcon}>{leftIcon}</div>
      <div className={styles.rightText}>
        <div className={styles.rightTitle}>{rightTitle}</div>
        <div className={styles.rightContent}>{rightContent}</div>
      </div>
    </div>
  )
  return (
    <div className={styles.pkgDetail}>
      <nav>
        <NavBar onBack={() => navigate(-1)}>{hcPackage?.name}</NavBar>
      </nav>
      <header>
        <Image src={hcPackage?.banner} height={180}></Image>
      </header>
      <main className={styles.main}>
        <CapsuleTabs className={styles.content}>
          <CapsuleTabs.Tab title='介绍' key='introduce'>
            <div className={styles.price}>￥: {hcPackage?.price}</div>
            <div className={styles.baseInfo}>
              <div className={styles.name}>套餐名：{hcPackage?.name}</div>
              <div className={styles.count}>共 {proCount} 项</div>
            </div>
            <div className={styles.detailInfo}>
              {renderDetailItem(
                <MessageOutline width={20} height={20} color='#5e5b5b' />,
                "介绍",
                hcPackage?.introduce as string
              )}
              {renderDetailItem(
                <UserOutline width={20} height={20} color='#5e5b5b' />,
                "使用人群",
                `性别：${hcPackage?.gender === IGender.male ? "男" : "女"}`
              )}
            </div>
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='体检项目' key='hcProjects'>
            <div className={styles.hcProjectsHeader}>
              <div className={styles.headerName}>项目</div>
              <div className={styles.headerIntroduce}>项目描述</div>
            </div>
            <div className={styles.hcProjectsContent}>
              {proIntroduces.map((item) => (
                <ProBaseInfoItem key={item.name} proBaseInfo={item} />
              ))}
            </div>
          </CapsuleTabs.Tab>
          <CapsuleTabs.Tab title='体检须知' key='hcInstructions'>
            <div className={styles.hcInstructionsTitle}>体检须知</div>
            <ul className={styles.hcInstructionsUl}>
              {hcInstructions.map((item, index) => (
                <li key={item.name}>
                  {index + 1}. {item.name}：{item.content}
                </li>
              ))}
            </ul>
          </CapsuleTabs.Tab>
        </CapsuleTabs>

        <div className={styles.footer}>
          <div className={styles.leftPrice}>价格：{hcPackage?.price}元</div>
          <div
            className={styles.rightPay}
            onClick={() =>
              Modal.confirm({
                content: "确认支付?",
                onConfirm: () => addOrder({ pkgId: pkgId as string }),
              })
            }
          >
            支 付
          </div>
        </div>
      </main>
    </div>
  )
}
