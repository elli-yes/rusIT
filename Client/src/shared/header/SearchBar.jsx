import css from "./SearchBar.module.css"
import { useState } from "react"
import { Button } from "../button/Button"
import { Input } from "../Input/Input"

export const SearchBar = ({ searchQuerry, setSearchQuerry }) => {
  return (
    <div className={css.container}>
      <Input
        value={searchQuerry}
        onChange={(e) => setSearchQuerry(e.target.value)}
        placeholder={"Search..."}
      />
      <Button
        variant={"info"}
        children={<div className={css.ico}></div>}
      ></Button>
    </div>
  )
}
