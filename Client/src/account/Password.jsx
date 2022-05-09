import css from "./Settings.module.css"
import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { useState } from "react"

export const Password = () => {
  const [show, setShow] = useState({ np: 0, npc: 0, op: 0 })
  const [newPass, setNewPass] = useState("")
  const [newPassRep, setNewPassRep] = useState("")

  function doShow(field) {
    setShow((show) => ({ ...show, [field]: !show[field] }))
  }

  return (
    <div className={css.container}>
      <div className={css.title}>Password edit</div>
      <span>NOTE: don't forget to save it</span>

      <form className={css.form} action="">
        <div className={css.block}>
          <label>New password</label>

          <div className={css.row}>
            <Input
              value={newPass}
              onChange={setNewPass}
              type={show.np ? "text" : "password"}
              placeholder={"..."}
            />
            <Button
              onClick={(e) => {
                e.preventDefault()
                doShow("np")
              }}
              children={show.np ? "Hide" : "Show"}
            />
          </div>
        </div>

        <div className={css.block}>
          <label>Repeat password</label>

          <div className={css.row}>
            <Input
              value={newPassRep}
              onChange={setNewPassRep}
              type={show.npc ? "text" : "password"}
              placeholder={"..."}
            />
            <Button
              onClick={(e) => {
                e.preventDefault()
                doShow("npc")
              }}
              children={show.npc ? "Hide" : "Show"}
            />
          </div>
        </div>

        <div className={css.block}>
          <label>Old password</label>

          <div className={css.row}>
            <Input type={show.op ? "text" : "password"} placeholder={"..."} />
            <Button
              onClick={(e) => {
                e.preventDefault()
                doShow("op")
              }}
              children={show.op ? "Hide" : "Show"}
            />
          </div>
        </div>
        <div className={css.block}>
          {newPass === newPassRep ? (
            <Button variant={"exit"} onClick={() => {}} children={"Change"} />
          ) : (
            <h3 style={{ color: "red" }}>Passwords not same</h3>
          )}
        </div>
      </form>
    </div>
  )
}
