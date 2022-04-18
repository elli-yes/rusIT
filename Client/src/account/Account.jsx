import css from "./Account.module.css"
import { useParams, NavLink } from "react-router-dom"
import { VerticalMenu } from "./VerticalMenu"
import { Header } from "../shared/header/Header"
import { SettingsRouter } from "./SettingsRouter"

export const Account = (props) => {
  const { menu } = useParams()
  return (
    <>
      <Header />

      <div className={css.container}>
        <h2 className={css.title}>Settings</h2>
        <div className={css.left}>
          <VerticalMenu
            items={[
              { link: "login", title: "Login" },
              { link: "password", title: "Password" },
              { link: "token", title: "Token" },
            ]}
          />
        </div>
        <div className={css.main}>
          <SettingsRouter />
          {/* <Settings variant={menu}></Settings> */}
        </div>
      </div>
    </>
  )
}
