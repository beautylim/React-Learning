// import { useState } from "react"
import Counter from "./counter"
import TextEditor from "./textEditor"


const Refresh = () => {
  console.log("🔄 组件渲染")
  // const [count, setCount] = useState(0)
  // const [text, setText] = useState("hello")
  console.log("✅ 组件渲染完成\n")

  return (
    <div>
      {/* <div>
        <Child count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <Child2 text={text} />
        <button onClick={() => setText(text + "haha ")}>change text</button>
      </div> */}
      <Counter />
      <TextEditor />
    </div>
  )
}

// const Child = (props: { count: number }) => {
//   console.log("Child 组件渲染")
//   return (<div>{props.count}</div>)
// }

// const Child2 = (props: { text: string }) => {
//   console.log("Child2 组件渲染")
//   return (<div>{props.text}</div>)
// }

export default Refresh