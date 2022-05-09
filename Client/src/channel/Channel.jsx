import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { Header } from "../shared/header/Header"
import VideoJS from "../player/Video.jsx"
import css from "./Channel.module.css"
import { userAPI } from "../API/userService"
import { useEffect, useState } from "react"

export const Channel = ({ variant }) => {
  const { data, isLoading, error } = userAPI.useFetchCurrentUserQuery()
  const [setTitle, {}] = userAPI.useSetTitleMutation()
  const [setDescription, { isSuccess: isSuccessDesc }] =
    userAPI.useSetDescriptionMutation()
  const [streamTitle, setStreamTitle] = useState("")
  const [streamDescription, setStreamDescription] = useState("")
  const [status, setStatus] = useState(false)

  useEffect(() => {
    console.log(data)
    if (data) {
      setStreamTitle(data.stream_title)
      setStreamDescription(data.description)
      setStatus(data.is_active)
    }
  }, [data])

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
            {status ? <span>Online</span> : <span>Offline</span>}
          </div>
          <div className={css.about}>
            <hr />
            <span>Stream title:</span>
            <Input
              placeholder={"Your stream title"}
              value={streamTitle}
              onChange={setStreamTitle}
            />
            <Button
              children={"Save"}
              onClick={() => {
                setTitle({ stream_title: streamTitle })
              }}
            />
          </div>
          <div className={css.about}>
            <hr />
            <span>Channel description:</span>
            <hr />
            <span>Stream title:</span>
            <textarea
              value={streamDescription}
              onChange={(e) => setStreamDescription(e.target.value)}
              name="about"
              cols="30"
              rows="10"
            ></textarea>
            {isSuccessDesc ? <span>Saved</span> : <></>}
            <Button
              children={"Save"}
              onClick={() => {
                setDescription(streamDescription)
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
