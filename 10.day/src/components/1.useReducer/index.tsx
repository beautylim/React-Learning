
import { useReducer } from 'react'

type Action =
  | { type: "INC" }
  | { type: "DEC" }
  | { type: "SET"; payload: number }
const reducer = (state: number, action: Action) => { //批量更新
  switch (action.type) {
    case "INC":
      return state + 1
    case "DEC":
      return state - 1
    case "SET":
      return action.payload
    default:
      return state
  }
}
const Reducer = () => {
  const [state, dispatch] = useReducer(reducer, 0)

  return (
    <div>
      <h1>{state}</h1>
      <button onClick={() => dispatch({ type: "INC" })}>+</button>
      <button onClick={() => dispatch({ type: "DEC" })}>-</button>
      <button onClick={() => dispatch({ type: "SET", payload: 100 })}>100</button>

    </div>
  )
}

export default Reducer