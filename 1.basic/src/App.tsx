import { useRef, useState } from 'react'
import './App.css'
// import HelloWorld from './components/1.HelloWorld'
// import List from './components/2.List'
import { Hooks } from './components/3.UseRef'
function App() {
  const [isShow, setIsShow] = useState(true)
  return (
    <div>
      {/* <h1>选择接收还是不接受</h1>
      <HelloWorld title="接收" onChange={(count) => console.log(count)} />
      < HelloWorld title="不接收"
        render={(count) =>
          <div style={{ color: "blue" }}>
            你值得更好的 {count}
          </div>} /> */}
      {/* 
      <List></List> */}
      <button onClick={() => {
        setIsShow(isShow ? false : true)
      }}>{isShow ? "隐藏" : "显示"}</button>

      {isShow && <Hooks></Hooks>}
    </div >
  )
}

export default App
