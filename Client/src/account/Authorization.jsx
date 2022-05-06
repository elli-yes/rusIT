import { useState, useEffect } from "react"
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import css from "./Settings.module.css"
import { useNewUser } from "../shared/hooks/useNewUser"
import { authAPI } from "../API/authService"
import { useDispatch } from "react-redux"
import { setCredentials } from "../app/authSlice"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"
import { Loader } from "../shared/loader/Loader"

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
  function switchSign() {
    sign ? setSign(0) : setSign(1)
  }

  return isLoadingL ? (
    <Loader />
  ) : (
    <>
      <h2>Please log in</h2>
      <Loader />
      <div className={css.containerLog}>
        {sign ? (
          <SignIn switchSign={switchSign} />
        ) : (
          <SignUp switchSign={switchSign} />
        )}
      </div>
    </>
  )
}
