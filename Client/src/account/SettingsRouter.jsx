import { Route, Routes, Navigate } from "react-router-dom"
import { Authorization } from "./Authorization"
import { Login } from "./Login"
import { Token } from "./Token"
import { Password } from "./Password"
import { AccountInfo } from "./AccountInfo"
import { useSelector } from "react-redux"

export const SettingsRouter = () => {
  const isAuth = useSelector((state) => state.auth.token)

  if (isAuth)
    return (
      <Routes>
        <Route path="/" element={<AccountInfo />} />
        <Route path="login" element={<Login />} />
        <Route path="password" element={<Password />} />
        <Route path="token" element={<Token />} />
      </Routes>
    )
  return (
    <Routes>
      <Route path="/" element={<Authorization />} />
      <Route path="/*" element={<Navigate replace to="/account" />} />
    </Routes>
  )
}
