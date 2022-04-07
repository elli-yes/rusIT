import css from "./Settings.module.css"
import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"

export const Password = ({ variant }) => {
  return (
    <div className="container">
      <h1>Password edit</h1>
      <span>NOTE: don't forget to save it</span>
      <form className={css.form} action="">
        <Input placeholder={"New password"} />
        <Input placeholder={"Old password"} />
        <Button children={"Save"} />
      </form>
    </div>
  )
}
