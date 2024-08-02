import { Button, Form, Input } from "antd";
import styles from "./index.module.scss";
import usePerson from "../../hooks/usePerson";

export default function Regist() {
  const { adminRegist } = usePerson()

  const handleClickRegist = (values: any) => {
    console.log("regist",values);
    adminRegist(values)
  };

  return (
    <div className={styles.regist}>
      <div>注册</div>
      <Form
              name='basic'
              labelCol={{ span: 8 }}
              style={{ maxWidth: 600 }}
              onFinish={handleClickRegist}
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
                提交
                </Button>
              </Form.Item>
            </Form>
    </div>
  );
}
