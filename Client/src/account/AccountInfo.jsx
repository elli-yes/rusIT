import { Button } from "../shared/button/Button"
import css from "./Settings.module.css"

export const AccountInfo = ({ variant, auth }) => {
  return (
    <>
      <h2>Account</h2>
      <div className={css.container}>
        <h2>Hello NAME</h2>
        <Button onClick={auth} children={"Log out"} variant={"exit"} />
      </div>
    </>
  )
}
