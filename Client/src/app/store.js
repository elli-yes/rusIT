import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { streamsAPI } from "../API/streamsService"
import { authAPI } from "../API/authService"
import auth from "./authSlice"

const rootReducer = combineReducers({
  [streamsAPI.reducerPath]: streamsAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  auth,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(streamsAPI.middleware)
      .concat(authAPI.middleware),
})
