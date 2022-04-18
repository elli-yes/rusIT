import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { Header } from "../shared/header/Header"
import css from "./Channel.module.css"

export const Channel = ({ variant }) => {
  return (
    <>
      <Header />
      <div className={css.container}>
        <h1>Password edit</h1>
      </div>
    </>
  )
}
