import css from "./BroadcastItem.module.css"
import { Input } from "../shared/Input/Input.jsx"
import { Button } from "../shared/button/Button.jsx"
import { useEffect, useState } from "react"
import { ENVAPI } from "../../config"

export const Chat = ({ user, room_id }) => {
  const [messages, setMessages] = useState([])
  const [mvalue, setMvalue] = useState("")
  const [client_id, setCl] = useState(user)

  const [ws, setWs] = useState()

  useEffect(() => {
    // if (client_id === null) setCl(Date.now())
    const ws = new WebSocket(
      `${ENVAPI.replace("http", "ws")}/ws/${room_id}` ///${client_id}
    )
    ws.onmessage = function (event) {
      setMessages((messages) => [...messages, JSON.parse(event.data)])
    }

    setWs(ws)
  }, [client_id])

  function sendMessage(event) {
    event.preventDefault()
    ws.send(JSON.stringify({ username: client_id, text: mvalue }))
    setMvalue("")
  }

  return (
    <div className={css.cht}>
      <div className={css.chat}>Rusich chat</div>
      <div className={css.messages}>
        {messages.map((m, i) => {
          return (
            <div className={css.mssg} key={i}>
              {m.username}: {m.text}
            </div>
          )
        })}
      </div>
      <div className={css.newmessage}>
        {user ? (
          <>
            <Input
              disabled={user ? false : true}
              value={mvalue}
              onChange={setMvalue}
              placeholder={"Message..."}
            />
            <Button onClick={sendMessage} children="Send" />
          </>
        ) : (
          <span>Please signin</span>
        )}
      </div>
    </div>
  )
}
