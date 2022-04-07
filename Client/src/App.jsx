import "./App.css"
import { useState } from "react"
import { MainRouter } from "./router/MainRouter"
import { Counter } from "./features/streamers/Streamers"

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <MainRouter />
      {/* <Counter></Counter> */}
    </div>
  )
}

export default App
