import css from "./Settings.module.css"
import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { useState } from "react"
import { userAPI } from "../API/userService"

export const Token = () => {
  const [show, setShow] = useState(false)
  const { data, isLoading, error, isSuccess } =
    userAPI.useFetchCurrentUserQuery()

  const [generateToken, {}] = userAPI.useGenerateTokenMutation()

  return (
    <div className="container">
      <form className={css.form} action="">
        <div className={css.title}>Token edit</div>
        <div>NOTE: don't show your token anybody</div>
        <div className={css.block}>
          <label>Your stream token</label>
          <div className={css.row}>
            {isSuccess ? (
              <>
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
              </>
            ) : (
              <h3>Server error</h3>
            )}
          </div>
        </div>
        <div className={css.block}>
          <Button
            variant={"exit"}
            onClick={(e) => {
              generateToken()
            }}
            children={"Generate new"}
          />
        </div>
      </form>
    </div>
  )
}
