import css from "./Settings.module.css"
import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { useState } from "react"

export const Password = () => {
  const [show, setShow] = useState({ np: 0, npc: 0, op: 0 })

  function doShow(field) {
    setShow((show) => ({ ...show, [field]: !show[field] }))
  }

  return (
    <div className="container">
      <h1>Password edit</h1>
      <span>NOTE: don't forget to save it</span>
      <form className={css.form} action="">
        <div className={css.row}>
          <label>New password</label>
          <Input
            type={show.np ? "text" : "password"}
            placeholder={"New password"}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              doShow("np")
            }}
            children={show.np ? "Hide" : "Show"}
          />
        </div>
        <div className={css.row}>
          <label>Repeat password</label>

          <Input
            type={show.npc ? "text" : "password"}
            placeholder={"Repeat password"}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              doShow("npc")
            }}
            children={show.npc ? "Hide" : "Show"}
          />
        </div>
        <div className={css.row}>
          <label>Old password</label>

          <Input
            type={show.op ? "text" : "password"}
            placeholder={"Old password"}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              doShow("op")
            }}
            children={show.op ? "Hide" : "Show"}
          />
        </div>

        <Button children={"Change"} />
      </form>
    </div>
  )
}
