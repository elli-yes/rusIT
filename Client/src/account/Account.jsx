import css from "./Account.module.css"
import { useState } from "react"
import { VerticalMenu } from "./VerticalMenu"
import { Header } from "../shared/header/Header"
import { SettingsRouter } from "./SettingsRouter"

export const Account = (props) => {
  const [searchQuerry, setSearchQuerry] = useState("")

  return (
    <>
      <Header searchQuerry={searchQuerry} setSearchQuerry={setSearchQuerry} />

      <div className={css.container}>
        <h2 className={css.title}>Settings</h2>
        <div className={css.left}>
          <VerticalMenu
            items={[
              { link: "password", title: "Password" },
              { link: "token", title: "Token" },
            ]}
          />
        </div>
        <div className={css.main}>
          <SettingsRouter />
        </div>
      </div>
    </>
  )
}
