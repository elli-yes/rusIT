import VideoJS from "../player/Video.jsx"
import css from "./BroadcastItem.module.css"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { Header } from "../shared/header/Header"
import { Info } from "./Info.jsx"
import { Input } from "../shared/Input/Input.jsx"
import { Button } from "../shared/button/Button.jsx"

export const BroadcastItem = () => {
  const streams = useSelector((state) => state.streamers.streamers)
  const { login } = useParams()

  const data = streams.filter((stream) => stream.login === login)

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
  console.log(`http://0.0.0.0:8080/hls/${login}.m3u8`)
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

  const [messages, setMessages] = useState([])
  const [mvalue, setMvalue] = useState("")
  const [ws, setWs] = useState()

  function connect(boo) {
    if (boo) {
      ws.close()
    }
    let sk = new WebSocket(`ws://${location.hostname}:8000/ws/${Date.now()}`)
    sk.onopen = function (event) {
      sk.onmessage = function (event) {
        console.log("LOG", event.data)
        setMessages((messages) => [...messages, event.data])
      }
    }
    setWs(sk)
  }

  useEffect(() => {
    connect()
  }, [])

  function sendMessage(event) {
    ws.send(mvalue)
    setMvalue("")
    event.preventDefault()
  }
  console.log(ws)
  return (
    <>
      <Header />
      <div className={css.container}>
        <div>
          <div className={css.broadcastItem}>
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          </div>
          <Info data={data} />
          <div className={css.about}>
            <hr />
            <h2>A few words about this channel</h2>
          </div>
        </div>
        <div className={css.cht}>
          <div className={css.chat}>Rusich chat</div>
          <div className={css.messages}>
            {messages.map((m, i) => {
              return (
                <div className={css.mssg} key={i}>
                  {m}
                </div>
              )
            })}
          </div>
          <div className={css.newmessage}>
            <Input
              value={mvalue}
              onChange={(e) => setMvalue(e.target.value)}
              placeholder={"Message..."}
            />
            <Button onClick={sendMessage} children="Send" />
          </div>
        </div>
      </div>
    </>
  )
}
