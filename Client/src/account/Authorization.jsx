import { useState } from "react"
import { Button } from "../shared/button/Button"
import { Input } from "../shared/Input/Input"
import css from "./Settings.module.css"

export const Authorization = ({ variant, auth }) => {
  return (
    <>
      <h2>Please log in</h2>
      <div className={css.containerLog}>
        <form className={css.form} action="">
          <h3>Login</h3>
          <Input placeholder={"Login"} />
          <Input placeholder={"Password"} />
          <Button onClick={auth} children={"Log in"} />
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
