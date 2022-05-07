import css from "./Settings.module.css"
//API
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { authAPI } from "../API/authService"
import { setCredentials } from "../app/authSlice"
//Components
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import { Loader } from "../shared/loader/Loader"

export const SignIn = ({ switchSign }) => {
  const [login, { data, isLoading, isError }] = authAPI.useLoginMutation()

  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")

  const [show, setShow] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (data) {
      dispatch(setCredentials({ token: data.access_token }))
    }
  }, [data])

  if (isLoading) {
    return <Loader />
  } else {
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
        <div className={css.row}>
          <label>Password</label>
          <Input
            type={show ? "text" : "password"}
            placeholder={"Password"}
            value={pass}
            onChange={setPass}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              setShow(!show)
            }}
            children={show ? "Hide" : "Show"}
          />
        </div>

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
}
