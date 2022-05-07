import css from "./Settings.module.css"
import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { useState } from "react"
import { userAPI } from "../API/userService"

export const Token = () => {
  const [show, setShow] = useState(false)
  const { data, isLoading, error, isSuccess } =
    userAPI.useFetchCurrentUserQuery()

  return (
    <div className="container">
      <h1>Token edit</h1>
      <span>NOTE: don't show your token anybody</span>
      <form className={css.form} action="">
        <div className={css.row}>
          <label>Your stream token</label>
          <Input
            value={data.key}
            type={show ? "text" : "password"}
            placeholder={"Token"}
          />
          <Button
            onClick={(e) => {
              e.preventDefault()
              setShow(!show)
            }}
            children={show.np ? "Hide" : "Show"}
          />
        </div>
        <Button
          onClick={(e) => {
            e.preventDefault()
          }}
          children={"Generate new"}
        />
      </form>
    </div>
  )
}
