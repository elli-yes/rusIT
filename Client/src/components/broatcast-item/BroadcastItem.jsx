import VideoJS from "../player/Video.jsx"
import css from "./BroadcastItem.module.css"
import React from "react"
import { useParams } from "react-router-dom"

export const BroadcastItem = () => {
  const { login } = useParams()
  console.log(login)
  const playerRef = React.useRef(null)

  const handlePlayerReady = (player) => {
    playerRef.current = player

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting")
    })

    player.on("dispose", () => {
      console.log("player will dispose")
    })
  }
  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
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
    </div>
  )
}
