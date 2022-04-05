import css from "./SearchBar.module.css"
import { Button } from "../button/Button"

export const SearchBar = ({ login, title, status, ...props }) => {
  return (
    <div className={css.container}>
      <input type="text" className={css.searchField} />
      <Button
        variant={"info"}
        children={<div className={css.ico}></div>}
      ></Button>
    </div>
  )
}
