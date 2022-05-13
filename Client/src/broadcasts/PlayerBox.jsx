import css from "./PlayerBox.module.css"
import { NavLink } from "react-router-dom"
import defImg from "../shared/assets/thumb.png"

export const PlayerBox = ({ login, title, status, thumb }) => {
  return (
    <NavLink to={`/stream/${login}`}>
      <div className={css.playerbox}>
        <object data={thumb} type="image/jpg">
          {console.log(thumb)}
          <img src={defImg} />
        </object>
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
