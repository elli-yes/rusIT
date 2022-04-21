import { Button } from "../shared/button/Button"
import css from "./Settings.module.css"
import { useUsersMe } from "../shared/hooks/useUsersMe"
import { useEffect, useState } from "react"
import { observer } from "mobx-react-lite" // Or "mobx-react".
import { userStore } from "../app/storeMobx"

export const AccountInfo = ({ variant, auth }) => {
  // const [user, setUser] = useState(userStore)
  const { data, error, loading, request, success } = useUsersMe()

  useEffect(() => {
    request()
  }, [])

  // userStore = data

  // useEffect(() => {
  //   setUser(userStore)
  // }, [userStore])
  return (
    <>
      <h2>Account</h2>
      <div className={css.container}>
        {success ? <h2>Hello, {data.username} !</h2> : <h2>Hello!</h2>}

        <Button onClick={auth} children={"Log out"} variant={"exit"} />
      </div>
    </>
  )
}
