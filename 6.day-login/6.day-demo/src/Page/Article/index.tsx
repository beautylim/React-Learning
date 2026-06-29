

import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Image, Popconfirm } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
import { Table, Tag, Space } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useChannel, type Channel } from '../../hooks/useChannel'
import { deleteArticleApi, getMyArticlesApi, type Article, type ArticleQuery } from '../../apis/article'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

const { Option } = Select
const { RangePicker } = DatePicker
interface Cover {
  images: string[]
}

const datePickerFormat = "YYYY-MM-DD"

function getThreeMonthsAgo(): Date {
  const result = new Date();
  result.setMonth(result.getMonth() - 3);
  return result;
}

function getThreeMonthsAgoStr(): string {
  const result = new Date();
  result.setMonth(result.getMonth() - 3);
  return dayjs(result).format(datePickerFormat);
}

function getCurrentDateStr(): string {
  const result = new Date();
  return dayjs(result).format(datePickerFormat);
}
const Article = () => {
  const [dataSource, setDataSource] = useState<Article[]>([]);
  const [articleCount, setArticleCount] = useState(0)
  const [query, setQuery] = useState<ArticleQuery>({
    status: 0,
    channelId: 0,
    startTime: dayjs(getThreeMonthsAgo()).format(datePickerFormat),
    endTime: dayjs(new Date()).format(datePickerFormat),
    pageNum: 1,
    pageSize: 4
  })

  const onFinish = (value: any) => {
    console.log(value)
    setQuery({
      status: value.status,
      channelId: value.channel_id,
      startTime: value.date && value.date[0].format(datePickerFormat),
      endTime: value.date && value.date[1].format(datePickerFormat),
      pageNum: 1,
      pageSize: 4
    })
  }
  useEffect(() => {
    const getList = async () => {
      const res = await (await getMyArticlesApi(query)).data
      setDataSource(res.list)
      setArticleCount(res.total)
    }
    getList()
  }, [query])

  const statusMap: Record<number, { color: string; text: string }> = {
    1: { color: 'yellow', text: '审核中' },
    2: { color: 'green', text: '审核通过' },
  };
  const deleteConfirm = async (data: Article) => {
    if (data.id) {
      await deleteArticleApi(data.id)
      setQuery({
        ...query
      })
    }
  }
  const navigate = useNavigate()
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      key: 'cover',
      render: (_: any, { cover }: { cover?: Cover }) => (
        cover?.images.map(item => (
          <Image height={100} src={item} key={item}></Image>
        ))
      )
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => {
        const config = statusMap[status];
        return config ? <Tag color={config.color}>{config.text}</Tag> : '-';
      }
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '阅读数',
      dataIndex: 'readCount',
      key: 'readCount',
    },
    {
      title: '评论数',
      dataIndex: 'commentCount',
      key: 'commentCount',
    },
    {
      title: '点赞数',
      dataIndex: 'likeCount',
      key: 'likeCount',
    },
    {
      title: '操作',
      dataIndex: "operation",
      key: "operation",
      render: (_: any, data: Article) => {
        return (
          <Space size="middle">
            <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => navigate(`/publish?id=${data.id}`)} />
            <Popconfirm
              title="删除文章"
              description="确定要删除当前文章吗?"
              onConfirm={() => deleteConfirm(data)}
              // onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger shape="circle" icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space >
        )
      }
    }
  ];
  const { channels } = useChannel()
  const onPageChange = (page: number) => {
    setQuery({
      ...query,
      pageNum: page
    })
  }

  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to="/">首页</Link> },
            { title: '文章列表' },
          ]}
          />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: null }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={null}>全部</Radio>
              <Radio value={1}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 220 }}
            >
              {channels?.map((item: Channel) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示 */}
            <RangePicker locale={locale} defaultValue={[dayjs(getThreeMonthsAgoStr(), datePickerFormat), dayjs(getCurrentDateStr(), datePickerFormat)]} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      {/* 表格区域 */}
      <Card title={`根据筛选条件共查询到 ${articleCount} 条结果：`}>
        <Table rowKey="id" columns={columns} dataSource={dataSource} pagination={{ total: articleCount, pageSize: query.pageSize, onChange: onPageChange }} />
      </Card>
    </div >
  )
}

export default Article