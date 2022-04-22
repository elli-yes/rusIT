import axios from "axios"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchStreams = createAsyncThunk(
  "fetchStreams",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/streams`,
        {},
        { withCredentials: true }
      )
      return res.data
    } catch (e) {
      thunkAPI.rejectWithValue(e)
    }
  }
)
