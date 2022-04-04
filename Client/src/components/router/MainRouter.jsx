// import css from "./PlayerBox.module.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Broadcasts } from "../broadcasts/Broadcasts";
import { BroadcastItem } from "../broatcast-item/BroadcastItem";
import { Header } from "../header/Header";

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Broadcasts />} />
        <Route path="/test" element={<BroadcastItem />} />
      </Routes>
    </BrowserRouter>
  );
};
