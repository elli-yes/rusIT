import css from "./Broadcasts.module.css"
import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { MySelect } from "../shared/select/MySelect"
import { PlayerBox } from "./PlayerBox"
import { Header } from "../shared/header/Header.jsx"

export const Broadcasts = () => {
  const streams = useSelector((state) => state.streamers.streamers)
  const [selectedSort, setSort] = useState("status")
  const [searchQuerry, setSearchQuerry] = useState("")

  const sortedStreams = useMemo(() => {
    console.log("HF<JNF")
    if (selectedSort === "status") {
      return [...streams].sort((a, b) =>
        a[selectedSort] > b[selectedSort] ? -1 : 1
      )
    } else {
      return [...streams].sort((a, b) =>
        a[selectedSort].localeCompare(b[selectedSort])
      )
    }
  }, [selectedSort, streams])

  const sortedAndSearched = useMemo(() => {
    return sortedStreams.filter(
      (stream) =>
        stream.title.toLowerCase().includes(searchQuerry.toLowerCase()) ||
        stream.login.toLowerCase().includes(searchQuerry.toLowerCase())
    )
  }, [searchQuerry, sortedStreams])
  const sortStreams = (sort) => {
    setSort(sort)
  }

  return (
    <>
      <Header searchQuerry={searchQuerry} setSearchQuerry={setSearchQuerry} />
      <div className={css.container}>
        <MySelect
          value={selectedSort}
          onChange={sortStreams}
          defaultValue="Sort by online"
          options={[
            { value: "login", name: "Sort by name" },
            { value: "title", name: "Sort by stream" },
          ]}
        />

        {sortedAndSearched.map((stream) => {
          return (
            <PlayerBox
              key={stream.login}
              login={stream.login}
              title={stream.title}
              status={stream.status}
            />
          )
        })}
      </div>
    </>
  )
}
