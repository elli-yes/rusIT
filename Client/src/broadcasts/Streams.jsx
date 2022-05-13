import { PlayerBox } from "./PlayerBox"
import { ENVAPI } from "../../config"

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
            thumb={`${ENVAPI}/api/images/${stream.username}.jpg`}
          />
        )
      })}
    </>
  )
}
