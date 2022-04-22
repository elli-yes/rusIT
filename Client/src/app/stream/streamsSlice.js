import { createSlice } from "@reduxjs/toolkit"
import { fetchStreams } from "./streamsActionCreator"

const initialState = {
  streams: [],
  isLoading: false,
  errors: "",
}
export const streamsSlice = createSlice({
  name: "streamers",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchStreams.fulfilled.type]: (state, action) => {
      state.streams = action.payload
      state.errors = ""
      state.isLoading = false
    },
    [fetchStreams.pending.type]: (state) => {
      state.isLoading = true
    },
    [fetchStreams.rejected.type]: (state, action) => {
      state.errors = action.payload
      state.isLoading = false
    },
  },
})

export default streamsSlice.reducer
