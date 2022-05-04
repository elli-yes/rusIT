import { useState, useEffect } from "react"
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import css from "./Settings.module.css"
import { useNewUser } from "../shared/hooks/useNewUser"
import { authAPI } from "../API/authService"
import { useDispatch } from "react-redux"
import { setCredentials } from "../app/authSlice"

export const Authorization = ({ auth }) => {
  const [username, setUsername] = useState("")
  const [pass, setPass] = useState("")
  const [usernameR, setUsernameR] = useState("")
  const [passR, setPassR] = useState("")
  const [sign, setSign] = useState(1)

  const [login, { data: dataL, isLoading: isLoadingL }] =
    authAPI.useLoginMutation()

  const [createUser, { data: dataReg, isLoading: isLoadingReg, isSuccess }] =
    authAPI.useCreateUserMutation()

  const dispatch = useDispatch()
  // const reg = useNewUser()

  useEffect(() => {
    if (dataL) {
      // console.log(dataL)
      dispatch(setCredentials({ token: dataL.access_token }))
      auth()
    }
  }, [dataL])

  // useEffect(() => {
  //   if (reg.data) {
  //     console.log(reg.data)
  //     auth()
  //   }
  // }, [reg.data])
  function switchSign() {
    sign ? setSign(0) : setSign(1)
  }
  return isLoadingL ? (
    <h1>LOADING</h1>
  ) : (
    <>
      <h2>Please log in</h2>
      <div className={css.containerLog}>
        {sign ? (
          <form
            className={css.form}
            onSubmit={(e) => {
              e.preventDefault()
              login({ username, password: pass })
              // request(username, pass)
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
        ) : (
          <form
            className={css.form}
            onSubmit={(e) => {
              e.preventDefault()
              createUser({ username: usernameR, password: passR })
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
                  value={usernameR}
                  onChange={setUsernameR}
                />
                <Input
                  type="password"
                  placeholder={"Password"}
                  value={passR}
                  onChange={setPassR}
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
        )}
      </div>
    </>
  )
}
