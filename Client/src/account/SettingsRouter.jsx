import { Route, Routes, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { Authorization } from "./Authorization"
import { Login } from "./Login"
import { Token } from "./Token"
import { Password } from "./Password"
import { AccountInfo } from "./AccountInfo"
import { useSelector, useDispatch } from "react-redux"

export const SettingsRouter = () => {
  const isAuth = useSelector((state) => state.token)
  const dispatch = useDispatch()

  // const [isAuth, setAuth] = useState(authStore.isAuthenticated)

  // useEffect(() => {
  //   setAuth(authStore.isAuthenticated)
  // }, [authStore.isAuthenticated])

  function auth(data) {
    if (isAuth) {
      logout()
      dispatch(setCredentials({ token: null }))
    }
  }

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
}
