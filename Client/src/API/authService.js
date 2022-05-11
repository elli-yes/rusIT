import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { ENVAPI } from "../../config"
export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${ENVAPI}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
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
    createUser: build.mutation({
      query: (acc) => ({
        url: `/users`,
        method: "POST",
        body: acc,
      }),
    }),
    refresh: build.mutation({
      query: () => ({
        url: `/refresh-tokens`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
})
