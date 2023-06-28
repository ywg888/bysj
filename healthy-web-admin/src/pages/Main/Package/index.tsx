import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Table,
  Upload,
} from "antd"
import { useContext, useMemo, useState } from "react"
import TopActionBar from "../../../components/TopActionBar"
import usePackage from "../../../hooks/usePackage"
import useColums, { PkgDataType } from "../../../hooks/useColums"
import { UploadOutlined } from "@ant-design/icons"
import { IGender } from "../../../type"
import { context } from "../../../hooks/store"
import axios from "axios"

const { TextArea } = Input
const { Option } = Select

enum IModalStatus {
  add = 1,
  edit = 2,
}

// 编写
export default function Package() {
  const { packages, add, edit, del } = usePackage()
  const { projectMap } = useContext(context)
  const { packageCols } = useColums()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [modalStatus, setModalStatus] = useState(IModalStatus.add)
  const [avatrVisitUrl, setAvatrVisitUrl] = useState("")
  const [bannerVisitUrl, setBannerVisitUrl] = useState("")
  const data: PkgDataType[] = useMemo(() => {
    return packages.map((hcPackage) => {
      return {
        ...hcPackage,
        key: hcPackage._id,
        del: () =>
          Modal.confirm({
            title: "删除套餐",
            content: <div>确认删除 {hcPackage.name} 套餐吗？</div>,
            onOk() {
              del({ pkgId: hcPackage._id })
            },
          }),
        edit: () => {
          // 有时间处理
          const values = {
            // ...hcPackage,
            pkgId: hcPackage._id,
          }
          form.setFieldsValue(values)
          setModalStatus(IModalStatus.edit)
          setOpen(true)
        },
      }
    })
  }, [del, form, packages])

  const onSearch = async (value: string) => {
    console.log("你好", value)
    const res = await form.validateFields()
    console.log("formValues:", res)
  }
  const onFinish = async (values: any) => {
    values.avatar = avatrVisitUrl
    values.banner = bannerVisitUrl
    if (modalStatus === IModalStatus.add) {
      await add(values)
    } else {
      await edit({ ...values })
    }
    setOpen(false)
  }
  const onAvatarChange = async (info: any) => {
    if (info.file.status === "done") {
      // 图片上传完成，并且得到了响应
      const { url } = info.file.response.data
      const visitUrl = url.split("?")[0]
      // 异步上传即可
      await axios.put(url, info.fileList[0].originFileObj, {
        headers: { "Content-Type": "image/jpg" },
      })
      setAvatrVisitUrl(visitUrl)
    }
  }
  const onBannerChange = async (info: any) => {
    if (info.file.status === "done") {
      // 图片上传完成，并且得到了响应
      const { url } = info.file.response.data
      const visitUrl = url.split("?")[0]
      // 异步上传阿里云即可
      await axios.put(url, info.fileList[0].originFileObj, {
        headers: { "Content-Type": "image/jpg" },
      })
      setBannerVisitUrl(visitUrl)
    }
  }
  const normFile = (e: any): any => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  return (
    <div className='project'>
      <header>
        <h1>套餐管理</h1>
        <TopActionBar
          leftSearch={
            <Input.Search
              placeholder='请输入项目关键字'
              onSearch={onSearch}
              enterButton
            />
          }
          rightAdd={
            <Button
              type='primary'
              onClick={() => {
                setModalStatus(IModalStatus.add)
                setOpen(true)
              }}
            >
              添加套餐
            </Button>
          }
        />
      </header>
      <main>
        <Table columns={packageCols} dataSource={data} bordered />
      </main>
      <footer>
        <Modal
          title='添加套餐'
          open={open}
          onCancel={() => setOpen(false)}
          width={600}
          footer={null}
          style={{ top: 30 }}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout='horizontal'
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            form={form}
          >
            {modalStatus === IModalStatus.edit && (
              <Form.Item name='pkgId' label='套餐id'>
                <Input type='text' disabled />
              </Form.Item>
            )}
            <Form.Item name='name' label='套餐名' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name='proIds'
              label='项目'
              rules={[
                {
                  required: true,
                  message: "请选择项目",
                  type: "array",
                },
              ]}
            >
              <Select mode='multiple' placeholder='请选择项目'>
                {projectMap.map((item) => (
                  <Option key={item._id} value={item._id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name='price'
              label='价格/元'
              rules={[{ required: true }]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              name='avatar'
              label='头像'
              valuePropName='fileList'
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "请上传头像",
                  type: "array",
                },
              ]}
            >
              <Upload
                maxCount={1}
                action={"/api/image/upload"}
                listType='picture'
                onChange={onAvatarChange}
              >
                <Button icon={<UploadOutlined />}>上传头像</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='banner'
              label='背景'
              valuePropName='fileList'
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: "请上传背景",
                  type: "array",
                },
              ]}
            >
              <Upload
                maxCount={1}
                action={"/api/image/upload"}
                listType='picture'
                onChange={onBannerChange}
              >
                <Button icon={<UploadOutlined />}>上传背景</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              name='gender'
              label='性别'
              hasFeedback
              rules={[{ required: true, message: "请选择性别" }]}
              initialValue={IGender.male}
            >
              <Select placeholder='请选择性别'>
                <Option value={IGender.male}>男</Option>
                <Option value={IGender.female}>女</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name='marriedLimit'
              label='已婚限制'
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value={true}> yes </Radio>
                <Radio value={false}> no </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name='introduce'
              label='介绍'
              rules={[{ required: true }]}
            >
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label=' ' colon={false} style={{ textAlign: "center" }}>
              <Button type='primary' htmlType='submit'>
                提交
              </Button>
              <Button
                htmlType='button'
                style={{ marginLeft: 30 }}
                onClick={() => form.resetFields()}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </footer>
    </div>
  )
}
