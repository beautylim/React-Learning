import { Link, Outlet } from "react-router-dom"

export const Layout = () => {
  return (
    <div>
      一级路由
      <Link to="/">面板</Link>
      <Link to="about">关于</Link>
      {/*配置二级路由出口 */}
      <Outlet></Outlet>
    </div>
  )
}