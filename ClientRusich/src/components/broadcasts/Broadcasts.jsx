import css from "./Broadcasts.module.css"
import { PlayerBox } from "../player-box/PlayerBox"
import { NavLink } from "react-router-dom"

export const Broadcasts = () => {
  return (
    <div className={css.container}>
      <NavLink to="/test">
        <PlayerBox />
      </NavLink>
    </div>
  )
}
