import { forwardRef, useImperativeHandle, useRef } from "react"

// forwardRed暴露Dom
const Son = forwardRef((props, ref) => {
  const inputRef = useRef(null)
  const focusHandler = () => {
    inputRef.current.focus()
  }
  useImperativeHandle(ref, () => {
    return focusHandler
  })
  return (
    <input type="text" ref={inputRef} />
  )
})

const ReactRef = () => {
  const sonRef = useRef(null)
  const handleClick = () => {
    console.log(sonRef.current)
    sonRef.current()
  }

  return (
    <div>
      <Son ref={sonRef} />
      <button onClick={handleClick} >focus</button>
    </div>
  )
}

export default ReactRef