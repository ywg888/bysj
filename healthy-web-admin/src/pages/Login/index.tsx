import { Button, Form, Input } from "antd"
import { useCallback } from "react"
import usePerson from "../../hooks/usePerson"
import styles from "./index.module.scss"
export default function Login() {
  const { adminLogin } = usePerson()
  const onFinish = useCallback(
    (values: any) => {
      adminLogin(values)
    },
    [adminLogin]
  )

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
                <Button style={{ width: 200 }} type='primary' htmlType='submit'>
                  登录
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </main>
    </div>
  )
}
