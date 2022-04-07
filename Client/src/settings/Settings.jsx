import css from "./Settings.module.css"
import { Button } from "../shared/button/Button"

export const Settings = (props) => {
  switch (props.version) {
    case "token":
      return (
        <div className={css.container}>
          <h2>Token edit</h2>
          <form action="" className={css.form}>
            <label htmlFor="">Old token</label>
            <input type="text" />

            <label htmlFor="">New token</label>
            <input type="text" />

            <label htmlFor="">Password</label>
            <input type="text" />
            <Button variant={"confirm"}>Change</Button>
          </form>
        </div>
      )
    case "login":
      return (
        <div className={css.container}>
          <h2>Token edit</h2>
          <form action="" className={css.form}>
            <label htmlFor="">Old login</label>
            <input type="text" />

            <label htmlFor="">New login</label>
            <input type="text" />

            <label htmlFor="">Password</label>
            <input type="text" />
            <Button variant={"confirm"}>Change</Button>
          </form>
        </div>
      )
    case "password":
      return (
        <div className={css.container}>
          <h2>Token edit</h2>
          <form action="" className={css.form}>
            <label htmlFor="">Old password</label>
            <input type="text" />

            <label htmlFor="">New password</label>
            <input type="text" />

            <label htmlFor="">Confirm password</label>
            <input type="text" />
            <Button variant={"confirm"}>Change</Button>
          </form>
        </div>
      )
    default:
      return (
        <div className={css.container}>
          <h2>Token edit</h2>
          <form action="" className={css.form}>
            <label htmlFor="">Old token</label>
            <input type="text" />

            <label htmlFor="">New token</label>
            <input type="text" />

            <label htmlFor="">Password</label>
            <input type="text" />
            <Button variant={"confirm"}>Change</Button>
          </form>
        </div>
      )
  }
}
