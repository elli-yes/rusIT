import VideoJS from "../player/Video.jsx"
import css from "./BroadcastItem.module.css"
import React from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

export const BroadcastItem = () => {
  const streams = useSelector((state) => state.streamers.streamers)
  const { login } = useParams()

  const data = streams.filter((stream) => stream.login === login)

  console.log()
  const playerRef = React.useRef(null)

  const handlePlayerReady = (player) => {
    playerRef.current = player

    player.on("waiting", () => {
      console.log("player is waiting")
    })

    player.on("dispose", () => {
      console.log("player will dispose")
    })
  }
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `http://localhost:8080/hls/${login}.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  }

  return (
    <div className={css.broadcastItem}>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div className={css.info}>
        <span>
          <div className={data[0].status ? css.online : css.offline}></div>
          <div className={css.login}>{data[0].login}</div>
        </span>
        <div className={css.title}>{data[0].title}</div>
      </div>
      <div className={css.about}></div>
    </div>
  )
}
