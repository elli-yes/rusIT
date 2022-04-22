import "./App.css"
import { useEffect } from "react"
import { MainRouter } from "./router/MainRouter"
import { useRefresh } from "./shared/hooks/useRefresh"
import { authStore } from "./app/storeMobx"
import { observer } from "mobx-react-lite"

const App = observer(() => {
  const { data, loading, request, success } = useRefresh()

  useEffect(() => {
    request()
  }, [])

  useEffect(() => {
    if (success) {
      if (data) {
        authStore.isAuthenticated = true
      }
    }
  }, [success])

  if (loading) return null
  else
    return (
      <div className="App">
        <MainRouter />
      </div>
    )
})

export default App
