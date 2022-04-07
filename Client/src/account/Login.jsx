import css from "./Settings.module.css"
import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"

export const Login = ({ variant }) => {
  return (
    <div className="container">
      <h1>Login edit</h1>
      <span>
        NOTE: if you change login, your folowers can lose you. And don't forget
        to change OBS stream settings
      </span>
      <form className={css.form} action="">
        <Input placeholder={"New login"} />
        <Input placeholder={"Password confirm"} />
        <Button children={"Change"} />
      </form>
    </div>
  )
}
