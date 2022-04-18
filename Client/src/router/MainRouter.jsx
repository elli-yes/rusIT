import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Broadcasts } from "../broadcasts/Broadcasts"
import { BroadcastItem } from "../broatcast-item/BroadcastItem"
import { Account } from "../account/Account"
import { Channel } from "../channel/Channel"

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Broadcasts />} />
        <Route path="/account/*" element={<Account />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/stream/:login" element={<BroadcastItem />} />
      </Routes>
    </BrowserRouter>
  )
}
