import css from "./SearchBar.module.css"
import { useState } from "react"
import { Button } from "../button/Button"
import { Input } from "../Input/Input"

export const SearchBar = ({ searchQuerry, setSearchQuerry }) => {
  return (
    <form
      action="submit"
      onSubmit={(e) => {
        e.preventDefault()
      }}
    >
      <div className={css.container}>
        <Input
          value={searchQuerry}
          onChange={setSearchQuerry}
          placeholder={"Search..."}
        />
        <Button
          variant={"info"}
          children={<div className={css.ico}></div>}
        ></Button>
      </div>
    </form>
  )
}
