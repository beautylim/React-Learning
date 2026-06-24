import { useParams, useSearchParams } from "react-router-dom"

export const Login = () => {
  // const [params] = useSearchParams()
  const params = useParams()
  const username = params.username
  return (<div>
    这是登录页, 用户: {username}
  </div>)
}