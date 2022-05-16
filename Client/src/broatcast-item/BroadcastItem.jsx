import css from "./BroadcastItem.module.css"
//Components
import { Chat } from "./Chat"
import { Info } from "./Info.jsx"
import { Header } from "../shared/header/Header"
import { VideoPlayer } from "./VideoPlayer"
import { Loader } from "../shared/loader/Loader"
//API
import { useParams } from "react-router-dom"
import { streamsAPI } from "../API/streamsService"
import { userAPI } from "../API/userService"

export const BroadcastItem = () => {
  const { login } = useParams()

  const { data, isLoading, error } = streamsAPI.useFetchStreamItemQuery(login)

  const {
    data: user,
    isLoading: l,
    isSuccess,
    fulfilledTimeStamp,
  } = userAPI.useFetchCurrentUserQuery()

  return (
    <>
      <Header />
      <div className={css.container}>
        {isLoading && <Loader />}
        {error && <h1>{error}</h1>}
        {data ? (
          <>
            <div>
              <div className={css.broadcastItem}></div>
              <VideoPlayer login={login} />
              <Info data={data} />
            </div>
            {user && !l ? (
              <Chat user={user.username} room_id={login} />
            ) : (
              <Chat user={null} room_id={login} />
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}
