import css from "./Settings.module.css"
//API
import { useState } from "react"
import { authAPI } from "../API/authService"
//Components
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import { Loader } from "../shared/loader/Loader"

export const SignUp = ({ switchSign }) => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")

  const [createUser, { isSuccess, isLoading }] = authAPI.useCreateUserMutation()

  if (isLoading) {
    return <Loader />
  } else {
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
}
