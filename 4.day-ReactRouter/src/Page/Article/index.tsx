import { useSearchParams } from "react-router-dom"

export const Article = () => {
  const [params] = useSearchParams()
  const username = params.get("username")
  return (<div>
    这是文章页, 用户：{username}
  </div>)
}