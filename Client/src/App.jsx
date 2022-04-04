import "./App.css"
import { useState } from "react"
import { MainRouter } from "./components/router/MainRouter"


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MainRouter/>
    </div>
  )
}

export default App
