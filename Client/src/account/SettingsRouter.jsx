import { Route, Routes, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Authorization } from "./Authorization"
import { Login } from "./Login"
import { Token } from "./Token"
import { Password } from "./Password"
import { AccountInfo } from "./AccountInfo"
import { observer } from "mobx-react-lite" // Or "mobx-react".
import { authStore } from "../app/storeMobx.js"

export const SettingsRouter = observer(() => {
  const [isAuth, setAuth] = useState(authStore.isAuthenticated)
  useEffect(() => {
    setAuth(authStore.isAuthenticated)
  }, [authStore.isAuthenticated])

  function auth() {
    console.log("DONE")
    authStore.isAuthenticated
      ? (authStore.isAuthenticated = 0)
      : (authStore.isAuthenticated = 1)
  }
  console.log(authStore.isAuthenticated)

  if (isAuth)
    return (
      <Routes>
        <Route path="/" element={<AccountInfo auth={auth} />} />
        <Route path="login" element={<Login />} />
        <Route path="password" element={<Password />} />
        <Route path="token" element={<Token />} />
      </Routes>
    )
  return (
    <Routes>
      <Route path="/" element={<Authorization auth={auth} />} />
      <Route path="/*" element={<Navigate replace to="/account" />} />
    </Routes>
  )
})
