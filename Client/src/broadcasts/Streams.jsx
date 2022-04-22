import { PlayerBox } from "./PlayerBox"
import defImg from "../shared/assets/thumb.png"

export const Streams = ({ streams }) => {
  return (
    <>
      {streams.map((stream, i) => {
        return (
          <PlayerBox
            key={i}
            login={stream.username}
            title={stream.stream_title}
            status={1}
            thumb={defImg}
          />
        )
      })}
    </>
  )
}
