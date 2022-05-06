import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Broadcasts } from "../broadcasts/Broadcasts"
import { BroadcastItem } from "../broatcast-item/BroadcastItem"
import { Account } from "../account/Account"
import { Channel } from "../channel/Channel"
import { useSelector } from "react-redux"

export const MainRouter = () => {
  const isAuth = useSelector((state) => state.auth.token)

  return (
    <BrowserRouter>
      {isAuth ? (
        <Routes>
          <Route path="/" element={<Broadcasts />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/channel" element={<Channel />} />
          <Route path="/stream/:login" element={<BroadcastItem />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Broadcasts />} />
          <Route path="/account/*" element={<Account />} />
          <Route path="/stream/:login" element={<BroadcastItem />} />
          <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
      )}
    </BrowserRouter>
  )
}
