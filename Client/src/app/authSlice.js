import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      state.token = token
    },
  },
  extraReducers: (builder) => {},
})

export const { setCredentials } = slice.actions

export default slice.reducer
