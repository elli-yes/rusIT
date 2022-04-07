import css from "./Settings.module.css"
import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"

export const Token = ({ variant }) => {
  return (
    <div className="container">
      <h1>Token edit</h1>
      <span>
        NOTE: if you change login, your folowers can lose you. And don't forget
        to change OBS stream settings
      </span>
      <form className={css.form} action="">
        <Input placeholder={"Old token"} />
        <Input placeholder={"New token"} />
        <Button children={"Change"} />
      </form>
    </div>
  )
}
