import { memo, useState } from "react"



const ReactMemo = () => {
  console.log("🔄 组件渲染")
  const [count, setCount] = useState(0)
  const [text, setText] = useState("hello")
  console.log("✅ 组件渲染完成\n")

  return (
    <div>
      <div>
        <div>
          <Child count={count} />
          <button onClick={() => setCount(count + 1)}>+</button>
        </div>
        {text}
        <button onClick={() => setText(text + "aa ")}>change text</button>

      </div>

    </div>
  )
}

const Child = memo((props: { count: number }) => {
  console.log("Child 组件渲染")
  return (<div>{props.count}</div>)
})

// const Child2 = (props: { text: string }) => {
//   console.log("Child2 组件渲染")
//   return (<div>{props.text}</div>)
// }

export default ReactMemo