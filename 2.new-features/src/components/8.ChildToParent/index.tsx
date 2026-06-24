import { useState } from "react"

export const Child = ({ onGetChildMsg }: { onGetChildMsg: (msg: string) => void }) => {
  const sonMsg = "this is son msg"
  return (
    <div>
      <button onClick={() => { onGetChildMsg(sonMsg) }} >SendMsg</button>
    </div>
  )
}
export const Parent = () => {
  const [msg, setMsg] = useState("")
  const handleSonMsg = (childMsg: string) => {
    console.log(childMsg)
    setMsg(childMsg)
  }
  return (
    <div>
      <h1>{msg}</h1>
      <Child onGetChildMsg={handleSonMsg} >

      </Child>
    </div>

  )
}