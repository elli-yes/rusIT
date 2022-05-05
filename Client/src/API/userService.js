import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      if (token) {
        headers.set("Authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),

  endpoints: (build) => ({
    fetchCurrentUser: build.query({
      query: () => ({
        url: `/users/me`,
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
