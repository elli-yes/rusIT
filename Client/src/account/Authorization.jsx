import { useState, useEffect } from "react"
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import css from "./Settings.module.css"
import { login } from "./netManager"
import { useLogin } from "../shared/hooks/useLogin"
import { useNewUser } from "../shared/hooks/useNewUser"

export const Authorization = ({ variant, auth }) => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [usernameR, setUsernameR] = useState("")
  const [passR, setPassR] = useState("")
  // const [] = useState()

  const { data, loading, request } = useLogin()
  const reg = useNewUser()

  useEffect(() => {
    if (data) {
      console.log(data)
      auth()
    }
  }, [data])

  // useEffect(() => {
  //   if (reg.data) {
  //     console.log(reg.data)
  //     auth()
  //   }
  // }, [reg.data])

  return loading ? (
    <h1>LOADING</h1>
  ) : (
    <>
      <h2>Please log in</h2>
      <div className={css.containerLog}>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault()
            request(username, pass)
          }}
        >
          <h3>Login</h3>

          <Input
            placeholder={"Login"}
            value={username}
            onChange={setUsername}
          />
          <Input
            type="password"
            placeholder={"Password"}
            value={pass}
            onChange={setPass}
          />
          <Button type="submit" children={"Log in"} />
        </form>
        <form
          className={css.form}
          onSubmit={(e) => {
            e.preventDefault()
            reg.request(usernameR, passR)
          }}
        >
          {reg.success ? (
            <h3>Successfully registered, please login</h3>
          ) : (
            <>
              <h3>Registration</h3>
              <Input
                placeholder={"Login"}
                value={usernameR}
                onChange={setUsernameR}
              />
              <Input
                type="password"
                placeholder={"Password"}
                value={passR}
                onChange={setPassR}
              />
              <Button type="submit" children={"Registration"} />
            </>
          )}
        </form>
      </div>
    </>
  )
}
