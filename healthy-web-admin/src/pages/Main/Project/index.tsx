import {
  Button,
  Cascader,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Table,
} from "antd"
import { useMemo, useState } from "react"
import TopActionBar from "../../../components/TopActionBar"
import useColums, { ProDataType } from "../../../hooks/useColums"
import useProject from "../../../hooks/useProject"
import { addressOption } from "../../../libs/options"

const { TextArea } = Input

enum IModalStatus {
  add = 1,
  edit = 2,
}

export default function Project() {
  const { projects, add, edit, del } = useProject()
  const { projectCols } = useColums()
  const [open, setOpen] = useState(false)
  const [form] = Form.useForm()
  const [modalStatus, setModalStatus] = useState(IModalStatus.add)
  const data: ProDataType[] = useMemo(() => {
    return projects.map((project) => {
      return {
        ...project,
        key: project._id,
        del: () =>
          Modal.confirm({
            title: "删除项目",
            type: "error",
            content: <div>确认删除 {project.name} 项目吗？</div>,
            onOk() {
              del({ proId: project._id })
            },
          }),
        edit: () => {
          const values = {
            ...project,
            address: project.address.split("-"),
            proId: project._id,
          }
          form.setFieldsValue(values)
          setModalStatus(IModalStatus.edit)
          setOpen(true)
        },
      }
    })
  }, [del, form, projects])

  // 搜索
  const onSearch = async (value: string) => {
    console.log("你好", value)
  }

  // 模态框点击确认
  const onFinish = async (values: any) => {
    const { address } = values
    values.address = address.join("-")
    if (modalStatus === IModalStatus.add) {
      await add(values)
    } else {
      await edit({ ...values })
    }
    setOpen(false)
  }

  return (
    <div className='project'>
      <header>
        <h1>项目管理</h1>
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
              添加项目
            </Button>
          }
        />
      </header>
      <main>
        <Table columns={projectCols} dataSource={data} bordered />
      </main>
      <footer>
        <Modal
          title='添加项目'
          open={open}
          onCancel={() => setOpen(false)}
          width={600}
          footer={null}
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
              <Form.Item name='proId' label='项目id'>
                <Input type='text' disabled />
              </Form.Item>
            )}
            <Form.Item name='name' label='项目名' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item
              name='needEmpty'
              label='空腹项目'
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Radio value={true}> yes </Radio>
                <Radio value={false}> no </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name='address' label='地点' rules={[{ required: true }]}>
              <Cascader options={addressOption} />
            </Form.Item>
            <Form.Item
              name='duration'
              label='预计时间/秒'
              rules={[{ required: true }]}
            >
              <InputNumber />
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
                {modalStatus === IModalStatus.add ? "添加" : "修改"}
              </Button>
              {modalStatus === IModalStatus.add && (
                <Button
                  htmlType='button'
                  style={{ marginLeft: 30 }}
                  onClick={() => form.resetFields()}
                >
                  重置
                </Button>
              )}
            </Form.Item>
          </Form>
        </Modal>
      </footer>
    </div>
  )
}
