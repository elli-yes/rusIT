import { Input } from "../shared/Input/Input"
import { Button } from "../shared/button/Button"
import { Header } from "../shared/header/Header"
import VideoJS from "../player/Video.jsx"
import css from "./Channel.module.css"
import { userAPI } from "../API/userService"
import { useEffect, useState, useRef } from "react"
import { VideoPlayer } from "../broatcast-item/VideoPlayer"
import { Loader } from "../shared/loader/Loader"

export const Channel = ({ variant }) => {
  const { data, isSuccess } = userAPI.useFetchCurrentUserQuery()
  const [setTitle, { isSuccess: isSuccessTitle }] =
    userAPI.useSetTitleMutation()
  const [setDescription, { isSuccess: isSuccessDesc }] =
    userAPI.useSetDescriptionMutation()
  const [streamTitle, setStreamTitle] = useState("")
  const [streamDescription, setStreamDescription] = useState("")
  const [status, setStatus] = useState(false)

  useEffect(() => {
    if (data) {
      setStreamTitle(data.stream_title)
      setStreamDescription(data.description)
      setStatus(data.is_active)
    }
  }, [data])

  return (
    <>
      <Header />
      <div className={css.container}>
        <div className={css.broadcastItem}>
          {isSuccess ? <VideoPlayer login={data.username} /> : <Loader />}
        </div>
        <div className={css.info}>
          <div className={css.about}>
            <label>Status:</label>
            {status ? <h3>Online</h3> : <h3>Offline</h3>}
          </div>
          <div className={css.about}>
            <hr />
            <div className={css.row}>
              <label>Stream title:</label>
              <span className={isSuccessTitle ? css.tip : css.none}>Saved</span>
            </div>
            <div className={css.row}>
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
          </div>
          <div className={css.about}>
            <hr />
            <div className={css.row}>
              <label>Channel description:</label>
              <span className={isSuccessDesc ? css.tip : css.none}>Saved</span>
            </div>

            <div className={css.row}>
              <textarea
                value={streamDescription}
                onChange={(e) => setStreamDescription(e.target.value)}
                name="about"
                cols="30"
                rows="10"
              ></textarea>
              <Button
                children={"Save"}
                onClick={() => {
                  setDescription(streamDescription)
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
