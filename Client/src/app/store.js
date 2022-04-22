import { combineReducers, configureStore } from "@reduxjs/toolkit"
import streamsReducer from "./stream/streamsSlice"
import { streamsAPI } from "../API/streamsService.js"

const rootReducer = combineReducers({
  streamsReducer,
  [streamsAPI.reducerPath]: streamsAPI.reducer,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(streamsAPI.middleware),
})
