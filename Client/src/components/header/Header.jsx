import { Link } from "react-router-dom"
import png from "./Frame4.png"
import css from "./Header.module.css"
import { SearchBar } from "../searchBar/SearchBar"
import { Button } from "../button/Button"

export const Header = () => {
  return (
    <div className={css.header}>
      <Link to="/">
        <img src={png} alt="111" className={css.logo} />
      </Link>
      <SearchBar />
      <Link to="/account">
        <Button children={"Profile"} />
      </Link>
    </div>
  )
}
