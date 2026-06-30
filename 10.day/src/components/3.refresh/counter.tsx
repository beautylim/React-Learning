import { useState } from "react"

const Counter = () => {
  console.log("Counter 组件渲染")
  const [count, setCount] = useState(0)
  return (
    <div>
      {count}
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  )
}

export default Counter