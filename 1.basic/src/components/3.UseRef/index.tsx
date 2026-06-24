import { useEffect, useRef, useState } from "react";


export const Hooks = () => { // Hooks 尽量不要用泛型去做
  const [count, setCount] = useState<number>(0) // useState适合关联某个组件

  const inputRef = useRef<HTMLInputElement>(null) // useRef 可以获取Dom元素
  const isMounted = useRef(false) // useRef 可以缓存某个值， 这个值不会引起视图更新适合放在useRef里

  const handleAdd = () => {
    setCount((c) => c + 1)
  }

  // 副作用, 第一次渲染后执行，并在值变化后再次执行
  useEffect(() => {
    console.log(count)
    console.log(isMounted.current)
    document.title = `Current count: ${count}`
    count % 2 === 0 ? inputRef.current?.focus() : inputRef.current?.blur()
  }, [count])

  // 副作用, 提供空数组，仅在第一次渲染后执行，类比于类组件的onComponentDidMount
  useEffect(() => {
    console.log("Component did mount")

    // 标志组件已经挂载了
    isMounted.current = true
    return () => {
      console.log("Component did unmount")
    }
  }, [])

  // 副作用, 不提供数组，每次渲染后都执行，类比于类组件的onComponentDidUpdate
  useEffect(() => {
    console.log("Component did update")
  })

  return (
    <div>
      <div>Current count: {count}</div>

      <button onClick={handleAdd}>Add</button>
      <input ref={inputRef}></input>
    </div>
  );
};