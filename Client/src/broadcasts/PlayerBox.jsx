import css from "./PlayerBox.module.css"
import { NavLink } from "react-router-dom"

export const PlayerBox = ({ login, title, status, thumb }) => {
  return (
    <NavLink to={`/stream/${login}`}>
      <div className={css.playerbox}>
        <img src={thumb} />
      </div>
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
