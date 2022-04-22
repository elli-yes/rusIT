import { useRequest } from "./useRequest"
import { getStreams } from "../../broadcasts/netManager"
import { getStreamItem } from "../../broatcast-item/netManager"

export function useGetStreams() {
  return useRequest(getStreams)
}

export function useGetStreamItem() {
  return useRequest(getStreamItem)
}
