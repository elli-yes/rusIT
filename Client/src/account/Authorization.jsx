import css from "./Settings.module.css"
import { useState } from "react"
import { SignIn } from "./SignIn"
import { SignUp } from "./SignUp"

export const Authorization = () => {
  const [sign, setSign] = useState(1)

  function switchSign() {
    sign ? setSign(0) : setSign(1)
  }

  return (
    <>
      <h2>Please log in</h2>
      <div className={css.containerLog}>
        {sign ? (
          <SignIn switchSign={switchSign} />
        ) : (
          <SignUp switchSign={switchSign} />
        )}
      </div>
    </>
  )
}
