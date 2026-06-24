import { Link, useNavigate } from "react-router-dom"


export const DashBoard = () => {
  const navigate = useNavigate()

  return (<div>
    这是首页 <br />
    <h2>声明式导航</h2>

    <Link to="/article?username=min">searchParams传参</Link>

    <h2>编码式导航</h2>

    <button onClick={() => navigate("/login/min")}>params传参</button>
  </div>)
}