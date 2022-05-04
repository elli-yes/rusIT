import "./App.css"
import { useEffect } from "react"
import { MainRouter } from "./router/MainRouter"
import { authAPI } from "./API/authService"
import { useDispatch } from "react-redux"
import { setCredentials } from "./app/authSlice"

const App = () => {
  const [refresh, { data, isLoading, isSuccess }] = authAPI.useRefreshMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    refresh()
  }, [])

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials({ token: data.access_token }))
    }
  }, [isSuccess])

  if (isLoading) return null
  else
    return (
      <div className="App">
        <MainRouter />
      </div>
    )
}

export default App
