import { useReducer } from "react"


const initialState = {
  name: "lily",
  age: 18
}

type Action =
  | { type: "changeName"; payload: string }
  | { type: "changeAge"; payload: string }

const reducer = (
  state: typeof initialState,
  action: Action
) => {
  switch (action.type) {
    case "changeName":
      return {
        ...state,
        name: action.payload
      }
    case "changeAge":
      return {
        ...state,
        age: Number(action.payload)
      }
    default:
      return state
  }

}
export const UseReducer = () => {
  const [info, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      <h1>name: {info.name}</h1>
      <h1>age: {info.age}</h1>
      <input value={info.name} type="text" onChange={e => dispatch({
        type: "changeName",
        payload: e.target.value
      })} />
      <input value={info.age} type="text" onChange={e => dispatch({
        type: "changeAge",
        payload: e.target.value
      })} />
    </div>
  )
}