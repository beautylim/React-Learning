

import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message,
  type RadioChangeEvent
} from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleByIdApi, publishArticleApi, updateArticleApi } from '../../apis/article';
import { publishSuccessMessage, updateSuccessMessage } from '../../utils/messages';
import type { UploadFile, UploadProps } from 'antd/es/upload';
import { useChannel } from '../../hooks/useChannel';

const { Option } = Select;

interface FormValue {
  title: string,
  channel_id: number,
  content: string
}

const Publish = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [coverType, setCoverType] = useState(0)
  const [imageList, setImageList] = useState<UploadFile[]>([])
  const { channels } = useChannel()
  const [searchParams] = useSearchParams()
  const articleId = searchParams.get("id") || ""
  const [form] = Form.useForm()
  useEffect(() => {
    const getArticleDetails = async () => {
      const res = (await getArticleByIdApi(articleId)).data
      const formData = {
        title: res.title,
        channel_id: res.channelId,
        type: res.cover?.type,
        content: res.content
      }
      if (res.cover) {
        setCoverType(res.cover.type)
        setImageList(res.cover.images.map(url => { return { uid: new Date().getMilliseconds().toString(), name: url.substring(url.lastIndexOf("/")), url: url } }))
      }
      form.setFieldsValue(formData)
    }
    if (articleId) {
      getArticleDetails()
    }

  }, [articleId])


  const onFinish = async (value: FormValue) => {
    console.log(value)
    const request = {
      title: value.title,
      content: value.content,
      channelId: value.channel_id,
      cover: {
        type: coverType,
        images: imageList.map(item => item.response ? item.response.url : item.url)
      }
    }
    if (articleId) {
      const data = {
        ...request,
        id: Number(articleId)
      }
      await updateArticleApi(data)
      updateSuccessMessage(messageApi)
    } else {
      await publishArticleApi(request)
      publishSuccessMessage(messageApi)
    }

  }
  const props: UploadProps = {
    listType: "picture-card",
    showUploadList: {},
    action: "http://localhost:8440/article/upload/image",
    name: "image",
    maxCount: coverType,
    fileList: imageList,
    onChange(info) {
      console.log('file.status:', info.file.status);
      console.log('file.response:', info.file.response);
      console.log('file:', info.file);
      if (info.file.status === 'uploading') {
        setImageList(info.fileList)
      } else if (info.file.status === 'done') {
        messageApi.success(`${info.file.name} 图片上传成功`);
        setImageList(info.fileList)
      } else if (info.file.status === 'error') {
        messageApi.error(`${info.file.name} 图片上传失败`);
      }
    }
  };

  const onCoverTypeChange = (e: RadioChangeEvent) => {
    setCoverType(e.target.value);
    console.log(e.target.value)
  }
  return (
    <div className="publish">
      {contextHolder}
      <Card
        title={
          <Breadcrumb
            items={[
              { title: <Link to="/">首页</Link> },
              { title: `${articleId ? '编辑文章' : "发布文章"}` },
            ]}
          />
        }
      >
        {/* 这里是 Card 的内容区域，可放置表单等内容 */}
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          validateTrigger="onBlur"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              <Option value={0}>推荐</Option>
              {channels.map(item => <Option Option key={item.id} value={item.id} > {item.name}</Option>)}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type">
              <Radio.Group onChange={onCoverTypeChange} value={coverType} defaultValue={0}
                options={[
                  {
                    value: 1,
                    label: (<span>单图</span>)
                  },
                  {
                    value: 3,
                    label: (<span>三图</span>)
                  },
                  {
                    value: 0,
                    label: (<span>无图</span>)
                  }
                ]}
              />
            </Form.Item>
            {coverType > 0 && <Upload
              {...props}
            >
              <div style={{ marginTop: 8 }}>
                <PlusOutlined />
              </div>
            </Upload>}

          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
            {/* 这里可以放置输入框或富文本编辑器 */}
            <ReactQuill theme='snow' className="publish-quill"
              placeholder='请输入文章内容'
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                {articleId ? "更新文章" : "发布文章"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div >
  );
};

export default Publish