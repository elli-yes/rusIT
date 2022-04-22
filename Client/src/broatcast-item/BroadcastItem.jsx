import css from "./BroadcastItem.module.css"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Header } from "../shared/header/Header"
import { Info } from "./Info.jsx"
import { Chat } from "./Chat"
import { VideoPlayer } from "./VideoPlayer"
import { useFetching } from "../hooks/useFetching"
import StreamService from "../API/streamService"

import { useEffect, useState } from "react"
// const data = streams.filter((stream) => stream.username === login)

export const BroadcastItem = () => {
  const { login } = useParams()
  const [streamItem, setStreamItem] = useState(null)
  const [fetching, loading, error] = useFetching(async () => {
    const stream = await StreamService.getStreamItem(login)
    setStreamItem(stream)
  })

  useEffect(() => {
    fetching()
  }, [])

  return (
    <>
      <Header />
      <div className={css.container}>
        {loading ? (
          <h1>LOADING</h1>
        ) : (
          <div>
            <div className={css.broadcastItem}></div>
            <VideoPlayer login={login} />
            <Info data={streamItem} />
            <div className={css.about}>
              <hr />
              <h2>A few words about this channel</h2>
            </div>
          </div>
        )}
        <Chat />
      </div>
    </>
  )
}
