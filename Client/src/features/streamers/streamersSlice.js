import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  streamers: [
    { status: 1, title: "TANKIsuper", login: "ZapZAp" },
    { status: 0, title: "CSGOsuper", login: "NAVI" },
    { status: 0, title: "Pool and bikini", login: "Boobs1999" },
    { status: 1, title: "Doka2super", login: "Maddyson" },
    { status: 0, title: "BabaGE", login: "GarryPotniy from spanchbob" },
    { status: 0, title: "VIM", login: "kirill BigSmoke kumma" },
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
    setStreamers: (state, action) => {
      state.online += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { turnOn, turnOff, getStreamers } = streamersSlice.actions

export default streamersSlice.reducer
