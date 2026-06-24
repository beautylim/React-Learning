import { useState } from "react";


export const useToggle = () => {
  const [show, setShow] = useState(true)

  const toggle = () => {
    setShow(!show)
  }

  return { show, toggle }
}
