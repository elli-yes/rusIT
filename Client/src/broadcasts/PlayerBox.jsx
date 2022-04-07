import css from "./PlayerBox.module.css"
import { NavLink } from "react-router-dom"

export const PlayerBox = ({ login, title, status, ...props }) => {
  return (
    <NavLink to={`/stream/${login}`}>
      <div className={css.playerbox}>STREAM</div>
      <div className={css.playerboxTitle}>
        <div>{title}</div>

        <div className={css.stream}>
          <div className={status ? css.statusOn : css.statusOff}></div>
          <div>{login}</div>
        </div>
      </div>
    </NavLink>
  )
}
