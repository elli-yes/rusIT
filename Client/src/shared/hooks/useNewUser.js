import { useRequest } from "./useRequest"
// import { newUser } from "../../account/netManager"

export function useNewUser() {
  return useRequest(newUser)
}
