import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, Breadcrumb, Form, Button, Radio, Input, Upload, Space, Select, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getArticleByIdApi, publishArticleApi, updateArticleApi } from '../../apis/article';
import { publishSuccessMessage, updateSuccessMessage } from '../../utils/messages';
import { useChannel } from '../../hooks/useChannel';
const { Option } = Select;
const Publish = () => {
    const [messageApi, contextHolder] = message.useMessage();
    const [coverType, setCoverType] = useState(0);
    const [imageList, setImageList] = useState([]);
    const { channels } = useChannel();
    const [searchParams] = useSearchParams();
    const articleId = searchParams.get("id") || "";
    const [form] = Form.useForm();
    useEffect(() => {
        const getArticleDetails = async () => {
            const res = (await getArticleByIdApi(articleId)).data;
            const formData = {
                title: res.title,
                channel_id: res.channelId,
                type: res.cover?.type,
                content: res.content
            };
            if (res.cover) {
                setCoverType(res.cover.type);
                setImageList(res.cover.images.map(url => { return { uid: new Date().getMilliseconds().toString(), name: url.substring(url.lastIndexOf("/")), url: url }; }));
            }
            form.setFieldsValue(formData);
        };
        if (articleId) {
            getArticleDetails();
        }
    }, [articleId]);
    const onFinish = async (value) => {
        console.log(value);
        const request = {
            title: value.title,
            content: value.content,
            channelId: value.channel_id,
            cover: {
                type: coverType,
                images: imageList.map(item => item.response ? item.response.url : item.url)
            }
        };
        if (articleId) {
            const data = {
                ...request,
                id: Number(articleId)
            };
            await updateArticleApi(data);
            updateSuccessMessage(messageApi);
        }
        else {
            await publishArticleApi(request);
            publishSuccessMessage(messageApi);
        }
    };
    const props = {
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
                setImageList(info.fileList);
            }
            else if (info.file.status === 'done') {
                messageApi.success(`${info.file.name} 图片上传成功`);
                setImageList(info.fileList);
            }
            else if (info.file.status === 'error') {
                messageApi.error(`${info.file.name} 图片上传失败`);
            }
        }
    };
    const onCoverTypeChange = (e) => {
        setCoverType(e.target.value);
        console.log(e.target.value);
    };
    return (_jsxs("div", { className: "publish", children: [contextHolder, _jsx(Card, { title: _jsx(Breadcrumb, { items: [
                        { title: _jsx(Link, { to: "/", children: "\u9996\u9875" }) },
                        { title: `${articleId ? '编辑文章' : "发布文章"}` },
                    ] }), children: _jsxs(Form, { labelCol: { span: 4 }, wrapperCol: { span: 16 }, validateTrigger: "onBlur", onFinish: onFinish, form: form, children: [_jsx(Form.Item, { label: "\u6807\u9898", name: "title", rules: [{ required: true, message: '请输入文章标题' }], children: _jsx(Input, { placeholder: "\u8BF7\u8F93\u5165\u6587\u7AE0\u6807\u9898", style: { width: 400 } }) }), _jsx(Form.Item, { label: "\u9891\u9053", name: "channel_id", rules: [{ required: true, message: '请选择文章频道' }], children: _jsxs(Select, { placeholder: "\u8BF7\u9009\u62E9\u6587\u7AE0\u9891\u9053", style: { width: 400 }, children: [_jsx(Option, { value: 0, children: "\u63A8\u8350" }), channels.map(item => _jsxs(Option, { Option: true, value: item.id, children: [" ", item.name] }, item.id))] }) }), _jsxs(Form.Item, { label: "\u5C01\u9762", children: [_jsx(Form.Item, { name: "type", children: _jsx(Radio.Group, { onChange: onCoverTypeChange, value: coverType, defaultValue: 0, options: [
                                            {
                                                value: 1,
                                                label: (_jsx("span", { children: "\u5355\u56FE" }))
                                            },
                                            {
                                                value: 3,
                                                label: (_jsx("span", { children: "\u4E09\u56FE" }))
                                            },
                                            {
                                                value: 0,
                                                label: (_jsx("span", { children: "\u65E0\u56FE" }))
                                            }
                                        ] }) }), coverType > 0 && _jsx(Upload, { ...props, children: _jsx("div", { style: { marginTop: 8 }, children: _jsx(PlusOutlined, {}) }) })] }), _jsx(Form.Item, { label: "\u5185\u5BB9", name: "content", rules: [{ required: true, message: '请输入文章内容' }], children: _jsx(ReactQuill, { theme: 'snow', className: "publish-quill", placeholder: '\u8BF7\u8F93\u5165\u6587\u7AE0\u5185\u5BB9' }) }), _jsx(Form.Item, { wrapperCol: { offset: 4 }, children: _jsx(Space, { children: _jsx(Button, { size: "large", type: "primary", htmlType: "submit", children: articleId ? "更新文章" : "发布文章" }) }) })] }) })] }));
};
export default Publish;
