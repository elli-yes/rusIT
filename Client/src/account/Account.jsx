import css from "./Account.module.css"
import { useParams, NavLink } from "react-router-dom"
import { Settings } from "../settings/Settings"
import { Header } from "../shared/header/Header"

export const Account = (props) => {
  const { menu } = useParams()

  return (
    <>
      <Header />
      <div className={css.container}>
        <div className={css.left}>
          <div className={css.verticalMenu}>
            <NavLink to={`/account`}>
              <div className={menu == undefined ? css.active : ""}>Account</div>
            </NavLink>
            <NavLink to={`/account/login`}>
              <div className={menu === "login" ? css.active : ""}>Login</div>
            </NavLink>
            <NavLink to={`/account/password`}>
              <div className={menu === "password" ? css.active : ""}>
                Password
              </div>
            </NavLink>
            <NavLink to={`/account/token`}>
              <div className={menu === "token" ? css.active : ""}>Token</div>
            </NavLink>
          </div>
        </div>
        <div className={css.main}>
          <Settings version={menu}></Settings>
        </div>
      </div>
    </>
  )
}
