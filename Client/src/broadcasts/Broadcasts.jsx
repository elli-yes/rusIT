import css from "./Broadcasts.module.css"
import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { MySelect } from "../shared/select/MySelect"
import { PlayerBox } from "./PlayerBox"
import { Header } from "../shared/header/Header.jsx"
import defImg from "../shared/assets/thumb.png"
import { useGetStreams } from "../shared/hooks/useStreams"

export const Broadcasts = () => {
  const streams = useSelector((state) => state.streamers.streamers)
  // const [streams, setStreams] = useState([])
  const [selectedSort, setSort] = useState("status")
  const [searchQuerry, setSearchQuerry] = useState("")

  const { data, loading, request, success } = useGetStreams()

  // useEffect(() => {
  //   request()
  // }, [])

  // useEffect(() => {
  //   setStreams(data)
  // }, [success])

  const sortedStreams = useMemo(() => {
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
        {sortedAndSearched.length != 0 ? (
          sortedAndSearched.map((stream) => {
            console.log(stream.thumb)
            return (
              <PlayerBox
                key={stream.login}
                login={stream.login}
                title={stream.title}
                status={stream.status}
                thumb={defImg}
              />
            )
          })
        ) : (
          <h1>No one streaming now, maybe you'l be a new stream Star?</h1>
        )}
      </div>
    </>
  )
}
