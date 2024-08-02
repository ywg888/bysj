import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../../components/Loading"
import usePerson from "../../hooks/usePerson"

export default function WxLogin() {
  const { code } = useParams()
  const { login, loading } = usePerson()
  useEffect(() => {
    login(code as string)
  }, [login, code])
  return (
    <>
      <Loading content='登陆中...' visivle={loading} />
      <span>拉取微信信息中。。。</span>
    </>
  )
}
