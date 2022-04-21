import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { Header } from "../shared/header/Header"
import VideoJS from "../player/Video.jsx"
import css from "./Channel.module.css"

export const Channel = ({ variant }) => {
  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: `http://${location.hostname}:8080/hls/.m3u8`,
        type: "application/x-mpegURL",
      },
    ],
  }
  const handlePlayerReady = (player) => {
    playerRef.current = player

    player.on("waiting", () => {
      console.log("player is waiting")
    })

    player.on("dispose", () => {
      console.log("player will dispose")
    })
  }
  return (
    <>
      <Header />
      <div className={css.container}>
        <div className={css.broadcastItem}>
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        </div>
        <div className={css.info}>
          <div className={css.about}>
            <hr />
            <span>Status:</span>
            <div>RED</div>
          </div>
          <div className={css.about}>
            <hr />
            <span>Stream title:</span>
            <Input />
          </div>
          <div className={css.about}>
            <hr />
            <span>Channel description:</span>
            <textarea name="about" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
    </>
  )
}
