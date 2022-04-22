import css from "./BroadcastItem.module.css"
import { Input } from "../shared/Input/Input.jsx"
import { Button } from "../shared/button/Button.jsx"
import { useEffect, useState } from "react"
export const Chat = () => {
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
  // console.log(ws)
  return (
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
        <Input value={mvalue} onChange={setMvalue} placeholder={"Message..."} />
        <Button onClick={sendMessage} children="Send" />
      </div>
    </div>
  )
}
