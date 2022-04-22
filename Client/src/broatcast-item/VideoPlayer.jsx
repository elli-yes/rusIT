import VideoJS from "../player/Video.jsx"
import { useRef, useParams } from "react"

export const VideoPlayer = (login) => {
  const playerRef = useRef(null)
  // const { login } = useParams()

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
        src: `http://${location.hostname}:8080/hls/${login}.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  }
  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  )
}
