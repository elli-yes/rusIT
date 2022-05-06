import { Button } from "../shared/button/Button"
import css from "./Settings.module.css"
import { useEffect, useState } from "react"
import { userAPI } from "../API/userService"
import { authAPI } from "../API/authService"

export const AccountInfo = () => {
  const { data, isLoading, error, isSuccess } =
    userAPI.useFetchCurrentUserQuery()
  const [logout, { data: auth, isLoading: isA }] = authAPI.useLogoutMutation()

  // useEffect(() => {
  //   request()
  // }, [])

  // userStore = data

  useEffect(() => {
    isSuccess ? console.log(data) : console.log()
  }, [isSuccess])
  return (
    <>
      <h2>Account</h2>
      <div className={css.container}>
        {isSuccess ? <h2>Hello, {data.username} !</h2> : <h2>Hello!</h2>}

        <Button onClick={logout} children={"Log out"} variant={"exit"} />
      </div>
    </>
  )
}
