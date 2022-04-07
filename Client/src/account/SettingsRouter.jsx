import { Route, Routes, Navigate } from "react-router-dom"
import { useState } from "react"
import { Authorization } from "./Authorization"
import { Login } from "./Login"
import { Token } from "./Token"
import { Password } from "./Password"
import { AccountInfo } from "./AccountInfo"

export const SettingsRouter = () => {
  const [isAuth, setAuth] = useState(1)

  function auth() {
    console.log("DONE")
    isAuth ? setAuth(0) : setAuth(1)
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
