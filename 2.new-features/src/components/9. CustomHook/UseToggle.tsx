import { useToggle } from "."

export const UseToggle = () => {

  const { show, toggle } = useToggle()
  return (
    <div>
      {show && <div> Hey, how are you</div>}
      <button onClick={toggle}> 点击 </button>
    </div>
  )
}
