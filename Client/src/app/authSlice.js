import { createSlice } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "auth",
  initialState: { token: null, isAuth: false },
  reducers: {
    setCredentials: (state, { payload: { token } }) => {
      state.token = token
    },
    setAuth: (state, { payload: { isAuth } }) => {
      state.isAuth = isAuth
    },
  },
  extraReducers: (builder) => {},
})

export const { setCredentials } = slice.actions

export default slice.reducer
