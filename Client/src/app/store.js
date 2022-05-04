import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { streamsAPI } from "../API/streamsService"
import { authAPI } from "../API/authService"
import { userAPI } from "../API/userService"

import auth from "./authSlice"

const rootReducer = combineReducers({
  [streamsAPI.reducerPath]: streamsAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  auth,
})
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(streamsAPI.middleware)
      .concat(authAPI.middleware)
      .concat(userAPI.middleware),
})
