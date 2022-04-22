import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

export const streamsAPI = createApi({
  reducerPath: "streamsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  // tagTypes: ['Post'],
  endpoints: (build) => ({
    fetchAllStreams: build.query({
      query: () => ({
        url: `/streams`,
      }),
    }),
    fetchStreamItem: build.query({
      query: (username) => ({
        url: `/stream/${username}`,
      }),
    }),
  }),
})
