import css from "./Account.module.css"
import { NavLink, useLocation, useMatch, useParams } from "react-router-dom"

export const VerticalMenu = ({ items }) => {
  const menu = useLocation()
  return (
    <div className={css.verticalMenu}>
      <NavLink
        to={``}
        className={() => (menu.pathname === "/account" ? css.active : "")}
      >
        Account
      </NavLink>
      {items.map((item) => (
        <NavLink
          key={item.title}
          to={`${item.link}`}
          className={({ isActive }) => (isActive ? css.active : "")}
        >
          {item.title}
        </NavLink>
      ))}
    </div>
  )
}
