import { useCallback, useMemo, useState } from "react"

export const UseMemo = () => {
  const [count, setCount] = useState(0)
  const handleClick = useCallback(() => {
    setCount(count + 1)
  }, [count])

  const doubleInfo = useMemo(() => ({ info: count * 2 }), [count])
  return (
    <div>
      <p> {doubleInfo.info} </p>
      <button onClick={handleClick}>+</button>
    </div>
  )
}