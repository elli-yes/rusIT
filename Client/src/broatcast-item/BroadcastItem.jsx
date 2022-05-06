import css from "./BroadcastItem.module.css"
//Components
import { Chat } from "./Chat"
import { Info } from "./Info.jsx"
import { Header } from "../shared/header/Header"
import { VideoPlayer } from "./VideoPlayer"
//API
import { useParams } from "react-router-dom"
import { streamsAPI } from "../API/streamsService"

export const BroadcastItem = () => {
  const { login } = useParams()

  const {
    data: stream,
    isLoading,
    error,
  } = streamsAPI.useFetchStreamItemQuery(login)

  return (
    <>
      <Header />
      <div className={css.container}>
        {isLoading && <h1>LOADING</h1>}
        {error && <h1>{error}</h1>}
        {stream ? (
          <>
            <div>
              <div className={css.broadcastItem}></div>
              <VideoPlayer login={login} />
              <Info data={stream} />
              <div className={css.about}>
                <hr />
                <h2>A few words about this channel</h2>
              </div>
            </div>
            {/* <Chat /> */}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
