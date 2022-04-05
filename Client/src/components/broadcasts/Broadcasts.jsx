import css from "./Broadcasts.module.css"
import { PlayerBox } from "../player-box/PlayerBox"
import { useSelector } from "react-redux"

export const Broadcasts = () => {
  const streams = useSelector((state) => state.streamers.streamers)
  console.log(streams)
  return (
    <div className={css.container}>
      {streams.map((stream) => {
        return (
          <PlayerBox
            key={stream.login}
            login={stream.login}
            title={stream.title}
            status={stream.status}
          />
        )
      })}
    </div>
  )
}
