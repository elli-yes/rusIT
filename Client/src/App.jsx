import "./App.css"
import { useEffect, useState } from "react"
import { MainRouter } from "./router/MainRouter"
import { useRefresh } from "./shared/hooks/useRefresh"
import { authStore } from "./app/storeMobx"
import { observer } from "mobx-react-lite" // Or "mobx-react".

const App = observer(() => {
  const { data, loading, request, success } = useRefresh()

  useEffect(() => {
    request()
  }, [])
  useEffect(() => {
    if (success) {
      console.log("JUK")
      authStore.isAuthenticated = true
    }
  }, [success])
  console.log("LOL", success, authStore.isAuthenticated)

  if (loading) return null
  else
    return (
      <div className="App">
        <MainRouter />
        {/* <Counter></Counter> */}
      </div>
    )
})

export default App
