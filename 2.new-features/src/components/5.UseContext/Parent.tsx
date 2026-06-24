import { useState } from "react"
import { Child } from "./Child"
import { ThemeContext } from "./ThemeContext"


export const Parent = () => {
  const [theme, setTheme] = useState("light")
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }
  return (
    <div>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <Child />
        <button onClick={toggleTheme}>Change Theme</button>
      </ThemeContext.Provider>
    </div>

  )
}