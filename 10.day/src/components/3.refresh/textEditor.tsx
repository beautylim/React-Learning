import { useState } from "react"

const TextEditor = () => {
  console.log("TextEditor 组件渲染")
  const [text, setText] = useState("hello")

  return (<div>{text}<button onClick={() => setText(text + "haha ")}>change text</button></div>)
}

export default TextEditor