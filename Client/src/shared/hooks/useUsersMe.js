import { useRequest } from "./useRequest"
import { usersMe } from "../../account/netManager"

export function useUsersMe() {
  return useRequest(usersMe)
}
