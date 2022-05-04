import { useRequest } from "./useRequest"
// import { login } from "../../account/netManager"

export function useLogin() {
  return useRequest(login)
}
