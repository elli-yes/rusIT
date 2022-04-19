import { Button } from "../shared/button/Button"
import css from "./Settings.module.css"
import { useUsersMe } from "../shared/hooks/useUsersMe"
import { useEffect } from "react"

export const AccountInfo = ({ variant, auth }) => {
  const { data, error, loading, request } = useUsersMe()

  useEffect(() => {
    request()
  }, [])

  return (
    <>
      <h2>Account</h2>
      <div className={css.container}>
        {loading ? <h2>Hello!</h2> : <h2>Hello, {data}</h2>}

        <Button onClick={auth} children={"Log out"} variant={"exit"} />
      </div>
    </>
  )
}
