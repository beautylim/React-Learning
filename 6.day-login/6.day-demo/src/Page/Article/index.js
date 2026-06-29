import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from 'react-router-dom';
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Image, Popconfirm } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { Table, Tag, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useChannel } from '../../hooks/useChannel';
import { deleteArticleApi, getMyArticlesApi } from '../../apis/article';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
const { Option } = Select;
const { RangePicker } = DatePicker;
const datePickerFormat = "YYYY-MM-DD";
function getThreeMonthsAgo() {
    const result = new Date();
    result.setMonth(result.getMonth() - 3);
    return result;
}
function getThreeMonthsAgoStr() {
    const result = new Date();
    result.setMonth(result.getMonth() - 3);
    return dayjs(result).format(datePickerFormat);
}
function getCurrentDateStr() {
    const result = new Date();
    return dayjs(result).format(datePickerFormat);
}
const Article = () => {
    const [dataSource, setDataSource] = useState([]);
    const [articleCount, setArticleCount] = useState(0);
    const [query, setQuery] = useState({
        status: 0,
        channelId: 0,
        startTime: dayjs(getThreeMonthsAgo()).format(datePickerFormat),
        endTime: dayjs(new Date()).format(datePickerFormat),
        pageNum: 1,
        pageSize: 4
    });
    const onFinish = (value) => {
        console.log(value);
        setQuery({
            status: value.status,
            channelId: value.channel_id,
            startTime: value.date && value.date[0].format(datePickerFormat),
            endTime: value.date && value.date[1].format(datePickerFormat),
            pageNum: 1,
            pageSize: 4
        });
    };
    useEffect(() => {
        const getList = async () => {
            const res = await (await getMyArticlesApi(query)).data;
            setDataSource(res.list);
            setArticleCount(res.total);
        };
        getList();
    }, [query]);
    const statusMap = {
        1: { color: 'yellow', text: '审核中' },
        2: { color: 'green', text: '审核通过' },
    };
    const deleteConfirm = async (data) => {
        if (data.id) {
            await deleteArticleApi(data.id);
            setQuery({
                ...query
            });
        }
    };
    const navigate = useNavigate();
    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            key: 'cover',
            render: (_, { cover }) => (cover?.images.map(item => (_jsx(Image, { height: 100, src: item }, item))))
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
            render: (status) => {
                const config = statusMap[status];
                return config ? _jsx(Tag, { color: config.color, children: config.text }) : '-';
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
            render: (_, data) => {
                return (_jsxs(Space, { size: "middle", children: [_jsx(Button, { type: "primary", shape: "circle", icon: _jsx(EditOutlined, {}), onClick: () => navigate(`/publish?id=${data.id}`) }), _jsx(Popconfirm, { title: "\u5220\u9664\u6587\u7AE0", description: "\u786E\u5B9A\u8981\u5220\u9664\u5F53\u524D\u6587\u7AE0\u5417?", onConfirm: () => deleteConfirm(data), 
                            // onCancel={cancel}
                            okText: "Yes", cancelText: "No", children: _jsx(Button, { type: "primary", danger: true, shape: "circle", icon: _jsx(DeleteOutlined, {}) }) })] }));
            }
        }
    ];
    const { channels } = useChannel();
    const onPageChange = (page) => {
        setQuery({
            ...query,
            pageNum: page
        });
    };
    return (_jsxs("div", { children: [_jsx(Card, { title: _jsx(Breadcrumb, { items: [
                        { title: _jsx(Link, { to: "/", children: "\u9996\u9875" }) },
                        { title: '文章列表' },
                    ] }), style: { marginBottom: 20 }, children: _jsxs(Form, { initialValues: { status: null }, onFinish: onFinish, children: [_jsx(Form.Item, { label: "\u72B6\u6001", name: "status", children: _jsxs(Radio.Group, { children: [_jsx(Radio, { value: null, children: "\u5168\u90E8" }), _jsx(Radio, { value: 1, children: "\u8349\u7A3F" }), _jsx(Radio, { value: 2, children: "\u5BA1\u6838\u901A\u8FC7" })] }) }), _jsx(Form.Item, { label: "\u9891\u9053", name: "channel_id", children: _jsx(Select, { placeholder: "\u8BF7\u9009\u62E9\u6587\u7AE0\u9891\u9053", style: { width: 220 }, children: channels?.map((item) => _jsx(Option, { value: item.id, children: item.name }, item.id)) }) }), _jsx(Form.Item, { label: "\u65E5\u671F", name: "date", children: _jsx(RangePicker, { locale: locale, defaultValue: [dayjs(getThreeMonthsAgoStr(), datePickerFormat), dayjs(getCurrentDateStr(), datePickerFormat)] }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", style: { marginLeft: 40 }, children: "\u7B5B\u9009" }) })] }) }), _jsx(Card, { title: `根据筛选条件共查询到 ${articleCount} 条结果：`, children: _jsx(Table, { rowKey: "id", columns: columns, dataSource: dataSource, pagination: { total: articleCount, pageSize: query.pageSize, onChange: onPageChange } }) })] }));
};
export default Article;
