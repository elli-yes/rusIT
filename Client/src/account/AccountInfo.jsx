import { Button } from "../shared/button/Button"
import css from "./Settings.module.css"
import { useEffect, useState } from "react"
import { userAPI } from "../API/userService"
import { authAPI } from "../API/authService"
import { useDispatch } from "react-redux"
import { setCredentials } from "../app/authSlice"

export const AccountInfo = () => {
  const dispatch = useDispatch()

  const { data, isLoading, error, isSuccess } =
    userAPI.useFetchCurrentUserQuery()

  const [logout, { data: auth, isSuccess: isExited }] =
    authAPI.useLogoutMutation()

  useEffect(() => {
    if (isExited) dispatch(setCredentials({ token: null }))
  }, [isExited])
  console.log(data, isLoading, isSuccess)
  return (
    <>
      <h2>Account</h2>
      <div className={css.container}>
        {isSuccess && !isLoading ? (
          <h2>Hello, {data.username} !</h2>
        ) : (
          <h2>Hello!</h2>
        )}

        <Button onClick={logout} children={"Log out"} variant={"exit"} />
      </div>
    </>
  )
}
