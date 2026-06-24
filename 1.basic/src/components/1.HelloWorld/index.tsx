import { useCallback, useState } from "react"
// props 父子组件传递
interface HelloWorldProps {
  title: string
  render?: (count: number) => React.ReactNode
  onChange?: (count: number) => void //回调函数
}

function HelloWorld(props: HelloWorldProps) {
  const { title, render, onChange } = props
  const [user, setUser] = useState({
    id: 1,
    name: "bob",
    age: 10
  })
  const [count, setCount] = useState(0)
  const handleAdd = () => {
    setCount(count + 1) // 异步操作
    onChange?.(count + 1) //所以这里也要加1，count值还没变
  }

  const handleAddAge = useCallback(() => {
    setUser((previous) => ({
      ...previous,
      age: previous.age + 1
    }))
  }, [])
  return (
    <div>
      {title} ------ {count}
      <button onClick={handleAdd} >+</button>
      {render?.(count)}

      <button onClick={handleAddAge} > {user.name} 的年龄是 {user.age}, 点击增加年龄</button>
    </div >
  )
};

export default HelloWorld