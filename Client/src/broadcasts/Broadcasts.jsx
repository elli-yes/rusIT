import css from "./Broadcasts.module.css"
//Components
import { Header } from "../shared/header/Header.jsx"
import { MySelect } from "../shared/select/MySelect"
import { Streams } from "./Streams"
//API
import { useState, useEffect } from "react"
import { useStreams } from "./useStreams"
import { streamsAPI } from "../API/streamsService"

export const Broadcasts = () => {
  const {
    data: streams,
    isLoading,
    error,
  } = streamsAPI.useFetchAllStreamsQuery("")

  const [selectedSort, setSort] = useState("status")
  const [searchQuerry, setSearchQuerry] = useState("")
  const [ssStreams, setSsStreams] = useState([])

  useEffect(() => {
    if (streams) {
      setSsStreams(useStreams(streams, selectedSort, searchQuerry))
    }
  }, [streams])

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
        {isLoading && <h1>LOADING</h1>}
        {error && <h1>ERR{error}</h1>}
        {ssStreams.length > 0 ? (
          <Streams streams={ssStreams} />
        ) : (
          <h1>No one streaming now, maybe you'l be a new stream Star?</h1>
        )}
      </div>
    </>
  )
}
