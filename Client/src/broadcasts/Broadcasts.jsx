import css from "./Broadcasts.module.css"
import { useState, useEffect, useMemo } from "react"
import { useSelector } from "react-redux"
import { MySelect } from "../shared/select/MySelect"
import { PlayerBox } from "./PlayerBox"
import { Header } from "../shared/header/Header.jsx"
import defImg from "../shared/assets/thumb.png"
import { useGetStreams } from "../shared/hooks/useStreams"
import { useStreams } from "./useStreams"

export const Broadcasts = () => {
  // const streams = useSelector((state) => state.streamers.streamers)
  const [selectedSort, setSort] = useState("status")
  const [searchQuerry, setSearchQuerry] = useState("")
  const [streams, setStreams] = useState([])

  const ssStreams = useStreams(streams, selectedSort, searchQuerry)

  const { data, loading, request, success } = useGetStreams()

  useEffect(() => {
    request()
  }, [])

  useEffect(() => {
    let cleanupFunction = false
    if (success) {
      if (!cleanupFunction) setStreams(data)
    }
    return () => (cleanupFunction = true)
  }, [success])

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
        {console.log(streams)}
        {loading ? (
          <h2>Loading</h2>
        ) : ssStreams.length != 0 ? (
          ssStreams.map((stream, i) => {
            return (
              <PlayerBox
                key={i}
                login={stream.username}
                title={stream.stream_title}
                status={1}
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
