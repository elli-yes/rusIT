import { configureStore } from "@reduxjs/toolkit"
import streamersReducer from "../features/streamers/streamersSlice.js"

export const store = configureStore({
  reducer: {
    streamers: streamersReducer,
  },
})
