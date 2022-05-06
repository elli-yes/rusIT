import css from "./Settings.module.css"
//API
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { authAPI } from "../API/authService"
//Components
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"

export const SignIn = ({ switchSign }) => {
  const [login, { data, isLoading, isError }] = authAPI.useLoginMutation()

  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ token: data.access_token }))
    }
  }, [data])

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault()
        login({ username, password: pass })
      }}
    >
      <h3>Login</h3>
      {isError ? <h3 style={{ color: "red" }}>Failed</h3> : <></>}

      <Input placeholder={"Login"} value={username} onChange={setUsername} />
      <Input
        type="password"
        placeholder={"Password"}
        value={pass}
        onChange={setPass}
      />
      <div>
        <Button type="submit" children={"Log in"} />
        <span>or</span>
        <Button
          variant={"confirm"}
          type="button"
          children={"Registrarion"}
          onClick={switchSign}
        />
      </div>
    </form>
  )
}
