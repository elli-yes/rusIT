import { useState } from "react"
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import css from "./Settings.module.css"
import { authAPI } from "../API/authService"

export const SignUp = ({ switchSign }) => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")

  const [createUser, { isSuccess }] = authAPI.useCreateUserMutation()

  return (
    <form
      className={css.form}
      onSubmit={(e) => {
        e.preventDefault()
        createUser({ username, password: pass })
      }}
    >
      {isSuccess ? (
        <>
          <h3>Successfully registered, please login</h3>
          <Button
            variant={"confirm"}
            type="button"
            children={"Log in"}
            onClick={switchSign}
          />
        </>
      ) : (
        <>
          <h3>Registration</h3>
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
          <div>
            <Button type="submit" children={"Registration"} />
            <span>or</span>
            <Button
              variant={"confirm"}
              type="button"
              children={"Log in"}
              onClick={switchSign}
            />
          </div>
        </>
      )}
    </form>
  )
}
