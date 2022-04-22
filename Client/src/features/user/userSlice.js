import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  username: "",
  password: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    turnOn: (state, action) => {
      state.streamers = [...state.streamers, action.payload]
    },
  },
})

export const { turnOn, turnOff, getStreamers } = streamersSlice.actions

export default userSlice.reducer
