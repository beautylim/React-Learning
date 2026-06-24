import { useEffect, useState } from "react"

// const delay = (ms: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms)
//   })
// }

export const UseEffect = () => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    // 实现副作用比如启动定时器
    // async function getList() {
    //   await delay(3000)
    //   setCount(previous => previous + 1)
    // }
    // getList()
    console.log("use effect")

    return () => { // 组件卸载时自动执行, 比如卸载定时器

    }
  }, [])

  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    <div>
      This is UseEffect {count}
      <button onClick={handleClick}>点击</button>
    </div>
  )
}