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
    setTitle: build.mutation({
      query: (title) => ({
        url: `/set_title`,
        method: "POST",
        body: title,
        credentials: "include",
      }),
    }),
    setDescription: build.mutation({
      query: (desc) => ({
        url: `/set_description`,
        method: "POST",
        body: { description: desc },
        credentials: "include",
      }),
    }),
    generateToken: build.mutation({
      query: () => ({
        url: `/create_new_uuid`,
        method: "POST",
        credentials: "include",
      }),
    }),
    generateToken: build.mutation({
      query: () => ({
        url: `/create_new_uuid`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
})
