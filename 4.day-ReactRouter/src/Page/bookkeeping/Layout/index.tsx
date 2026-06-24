import { useAppDispatch, useAppSelector } from "../../../store/hook"
import { useEffect } from "react"
import { fechBillList } from "../../../store/modules/billStore"
import { TabBar } from "antd-mobile"
import './index.scss'
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from 'antd-mobile-icons'
import { Outlet, useNavigate } from "react-router-dom"

export const Layout = () => {
  const tabs = [
    {
      key: '/',
      title: '月账单',
      icon: <BillOutline />
    },
    {
      key: '/new',
      title: '记一笔',
      icon: <AddCircleOutline />
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />
    }
  ]
  const { billList } = useAppSelector(state => state.bill)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fechBillList())
  }, [dispatch])

  // 跳转菜单
  const navigate = useNavigate()

  const switchTab = (path: string) => {
    console.log(path)
    navigate(path)
  }

  return (
    <div className="layout">
      <div className="container">
        <Outlet />
      </div>
      <div className="footer">
        <TabBar onChange={switchTab}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </div>
    </div>
  )
}