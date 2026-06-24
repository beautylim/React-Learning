import { message, type MenuProps } from "antd";
import { useEffect } from "react";
import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import './index.scss'
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { clearUserInfo, fetchUserInfo } from "../../store/modules/userInfoStore";
import { removeToken } from "../../store/modules/tokenStore";

const { Header, Sider } = Layout

const items = [
  {
    label: '首页',
    key: '/',
    icon: <HomeOutlined />
  },
  {
    label: '文章管理',
    key: '/article',
    icon: <DiffOutlined />
  },
  {
    label: '创建文章',
    key: '/publish',
    icon: <EditOutlined />
  },
]

const GeekLayout = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const location = useLocation()
  const selectedKey = location.pathname
  const dispatch = useAppDispatch()

  useEffect(() => {
    messageApi.open({
      type: 'success',
      content: "欢迎回来",
      duration: 0
    });
    setTimeout(messageApi.destroy, 2500);
    dispatch(fetchUserInfo())
  }, [])

  const { userInfo } = useAppSelector(state => state.userInfo)

  const navigate = useNavigate()
  const onMenuClick: MenuProps['onClick'] = (e) => {
    navigate(e.key)
  }

  const logout = () => {
    dispatch(removeToken())
    dispatch(clearUserInfo())
    navigate("/login")
  }

  return (
    <Layout style={{ height: '100%' }}>
      {contextHolder}
      <Header className="header">
        <div className="logo" >
          <span>欢迎回来</span>
        </div>
        <div className="user-info">
          <span className="user-name">用户: {userInfo.username}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={logout}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={['/']}
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            onClick={onMenuClick}
            selectedKeys={[selectedKey]}
          />
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet></Outlet>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default GeekLayout