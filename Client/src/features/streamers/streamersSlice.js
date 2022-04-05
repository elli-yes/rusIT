import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  streamers: [
    { status: 1, title: "Doka2super", login: "Maddyson" },
    { status: 0, title: "CSGOsuper", login: "NAVI" },
    { status: 1, title: "TANKIsuper", login: "ZapZAp" },
  ],
}

export const streamersSlice = createSlice({
  name: "streamers",
  initialState,
  reducers: {
    turnOn: (state, action) => {
      state.streamers = [...state.streamers, action.payload]
      console.log(state.streamers)
    },
    turnOff: (state, action) => {
      state.streamers.filter((stream) => stream === action.payload)
      console.log(state.streamers)
    },
    getStreamers: (state, action) => {
      state.online += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { turnOn, turnOff, getStreamers } = streamersSlice.actions

export default streamersSlice.reducer
