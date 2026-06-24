import { Navigate } from "react-router-dom"
import { getToken } from "../utils"

// 高阶组件模式/包装组件模式
const AuthRoute = (props: { children: React.ReactNode }) => {
  const token = getToken()
  if (token) {
    return <>{props.children}</>
  } else {
    return <Navigate to={"/login"} replace></Navigate >
  }
}

export default AuthRoute