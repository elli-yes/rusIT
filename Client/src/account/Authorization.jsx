import { useState, useEffect } from "react"
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import css from "./Settings.module.css"
import { login } from "./netManager"
import { useLogin } from "../shared/hooks/useLogin"

export const Authorization = ({ variant, auth }) => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  // const [] = useState()

  const { data, loading, request } = useLogin()

  useEffect(() => {
    if (data) {
      console.log(data)
      auth()
    }
  }, [data])

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
          <Input placeholder={"Password"} value={pass} onChange={setPass} />
          <Button type="submit" children={"Log in"} />
        </form>
        <form className={css.form} action="">
          <h3>Registration</h3>
          <Input placeholder={"Login"} />
          <Input placeholder={"Password"} />
          <Button onClick={auth} children={"Registration"} />
        </form>
      </div>
    </>
  )
}
