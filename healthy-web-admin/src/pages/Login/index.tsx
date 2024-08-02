import { Button, Form, Input } from "antd"
import { useCallback } from "react"
import usePerson from "../../hooks/usePerson"
import styles from "./index.module.scss"
import { useNavigate } from "react-router-dom"

export default function Login() {
  const { adminLogin } = usePerson()
  const navigate = useNavigate()
  const onFinish = useCallback(
    (values: any) => {
      adminLogin(values)
    },
    [adminLogin]
  )

  const handleRegist = () => {
    console.log('ywg-regist')
    navigate('/regist')
  }

  return (
    <div className={styles.login}>
      <main>
        <div className={styles.loginBox}>
          <div className={styles.title}>Healthy APP</div>
          <div className={styles.content}>
            <Form
              name='basic'
              labelCol={{ span: 8 }}
              style={{ maxWidth: 600 }}
              onFinish={onFinish}
              autoComplete='off'
            >
              <Form.Item
                label={<div style={{ color: "#fff" }}>账号：</div>}
                colon={false}
                name='account'
                style={{ color: "#fff" }}
                rules={[{ required: true, message: "请输入用户名！" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label={<div style={{ color: "#fff" }}>密码：</div>}
                colon={false}
                name='password'
                rules={[{ required: true, message: "请输入密码！" }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item style={{ paddingLeft: 150 }}>
                <Button style={{ width: 100 }} type='primary' htmlType='submit'>
                  登录
                </Button>
                <Button style={{ width: 100, marginLeft: 50, overflow: "hidden" }} onClick={handleRegist} type='default'>
                  注册
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </div>
  )
}
