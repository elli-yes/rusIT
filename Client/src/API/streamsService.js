import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"
import { ENVAPI } from "../../config"

export const streamsAPI = createApi({
  reducerPath: "streamsAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${ENVAPI}/api` }),
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
