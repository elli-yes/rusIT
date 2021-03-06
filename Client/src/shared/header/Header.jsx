import css from "./Header.module.css"
import png from "./Frame4.png"
import { Link } from "react-router-dom"
import { SearchBar } from "./SearchBar"
import { Button } from "../button/Button"
import { useSelector } from "react-redux"

export const Header = ({ searchQuerry, setSearchQuerry }) => {
  const isAuth = useSelector((state) => state.auth.token)

  return (
    <div className={css.header}>
      <Link to="/">
        <img src={png} alt="111" className={css.logo} />
      </Link>
      <SearchBar
        searchQuerry={searchQuerry}
        setSearchQuerry={setSearchQuerry}
      />
      {isAuth ? (
        <Link to="/channel">
          <Button children={"Channel"} variant={"confirm"} />
        </Link>
      ) : (
        <></>
      )}

      <Link to="/account">
        <Button
          children={
            <>
              <i className="material-icons">account_circle</i>
              <span> Account</span>
            </>
          }
        />
      </Link>
    </div>
  )
}
