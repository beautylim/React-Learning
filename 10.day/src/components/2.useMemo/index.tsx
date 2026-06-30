import { useMemo, useState } from "react"


const Memo = () => {
  console.log("🔄 组件开始渲染")

  const [count1, setCount1] = useState(0)
  console.log(`  📌 count1 = ${count1}`)

  const result = useMemo(() => {
    console.log("📊 useMemo 执行了！count1 changed")
    console.log(`  ➕ 计算: ${count1} + 1 = ${count1 + 1}`)
    return count1 + 1
  }, [count1])
  console.log(`  🎯 result = ${result}`)

  const [count2, setCount2] = useState(0)
  console.log(`  📌 count2 = ${count2}`)

  console.log("✅ 组件渲染完成\n")

  return (
    <div>
      {result}
      <p>count1(useMemo): {count1} <button onClick={() => setCount1(count1 + 1)}>+</button></p>
      <p>count2: {count2} <button onClick={() => setCount2(count2 + 1)}>+</button></p>
    </div >
  )
}

export default Memo