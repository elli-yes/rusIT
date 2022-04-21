import { useRequest } from "./useRequest"
import { getStreams } from "../../broadcasts/netManager"

export function useGetStreams() {
  return useRequest(getStreams)
}
