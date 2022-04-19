import { useRequest } from "./useRequest"
import { refresh } from "../../account/netManager"

export function useRefresh() {
  return useRequest(refresh)
}
