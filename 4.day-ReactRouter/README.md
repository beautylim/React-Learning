# 准备工作
npm install react-router-dom 

npm install react-router-dom @reduxjs/toolkit react-redux dayjs classnames antd-mobile axios @types/lodash

npm run dev

# 路径解析配置
配置vite.config.ts， tsconfig.json

# 启动json-server
1. npm install -D json-server
2. 创建json文件
3. 更改package.json 添加启动命令： "server": "json-server json路径 --port 自定义port"
4. npm run serve

# 导航

## 声明式导航
<Link to=""></Link>

## 编程式导航

# 路由模式

| 路由模式 | url表现     | 底层原理                     | 是否需要后端支持 |
| -------- | ----------- | ---------------------------- | ---------------- |
| history  | url/login   | history 对象 + pushState事件 | 需要             |
| hash     | url/#/login | 监听hashChange事件           | 不需要           |