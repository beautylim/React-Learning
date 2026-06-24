import { useEffect, useState } from "react"


function Son() {
  useEffect(() => {
    // load effect
    const timer = setInterval(() => {
      console.log("定时器执行中...")
    }, 1000)
    return () => { // unload effect when Son is disppear
      clearInterval(timer)
    }
  }, [])
  return (<div>Son</div>)
}


export const UnloadEffect = () => {

  const [show, setShow] = useState(true)

  return (
    <div>
      {show && <Son />}
      <button onClick={() => setShow(false)}> 卸载组件</button>
    </div>

  )
}