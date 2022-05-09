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

  const [show, setShow] = useState(false)
  const [createUser, { isSuccess, isLoading, isError }] =
    authAPI.useCreateUserMutation()

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
            <div className={css.title}>Registration</div>
            <div className={css.block}>
              <label>
                Login
                {isError ? (
                  <span style={{ color: "red" }}> failed</span>
                ) : (
                  <></>
                )}
              </label>
              <Input
                placeholder={"Login"}
                value={username}
                onChange={setUsername}
              />
            </div>
            <div className={css.block}>
              <label>Password</label>
              <div className={css.row}>
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
            </div>
            <div className={css.block}>
              <div className={css.row}>
                <Button type="submit" children={"Registration"} />
                <span>or</span>
                <Button
                  variant={"confirm"}
                  type="button"
                  children={"Log in"}
                  onClick={switchSign}
                />
              </div>
            </div>
          </>
        )}
      </form>
    )
  }
}
