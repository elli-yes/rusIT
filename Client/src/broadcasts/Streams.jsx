import { PlayerBox } from "./PlayerBox"
import { ENVAPI } from "../../config"
import css from "./Broadcasts.module.css"

export const Streams = ({ streams }) => {
  return (
    <div className={css.cont}>
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
    </div>
  )
}
