import { useState } from "react"

function List() {
  const [list, setList] = useState<number[]>([])
  return (
    <div>
      <button onClick={() => {
        list.push()
        setList([...list, list.length])
      }}>追加元素</button>
      {
        list.map(item => (
          item % 2 === 0 && <div key={item}> {item} </div>
        ))
      }
    </div>
  )
};

export default List