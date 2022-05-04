import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set("authentication", `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: (build) => ({
    login: build.mutation({
      query: (acc) => ({
        url: `/login`,
        method: "POST",
        body: acc,
        credentials: "include",
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
})