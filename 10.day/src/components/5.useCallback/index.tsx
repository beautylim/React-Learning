import { memo, useCallback, useMemo, useState } from "react"

// 如果props传的是一个引用类型，即使用了memo, react还是会重新渲染子组件,所以对函数的缓存用useCallback，
// 对引用对象比如说数组的缓存用useMemo
const Callback = () => {

  const onClick = useCallback((e: any) => {
    alert("hello," + e)
  }, [])

  const arr = useMemo(() => {
    return ["点击一下", "抽一下"]
  }, [])

  const [count, setCount] = useState(0)
  return (
    <div>
      <Child2 value={arr} onClick={onClick} />
      {count}
      <button onClick={() => setCount(count + 1)}>测试刷新</button>
    </div>
  )
}

const Child2 = memo((props: { value?: string[], onClick: any }) => {
  console.log("Child2 组件渲染")
  return (
    <div>
      {props.value?.map(item => (
        <button key={item} onClick={() => props.onClick(item)}>{item} Click</button>
      ))}
    </div>
  )
})

export default Callback