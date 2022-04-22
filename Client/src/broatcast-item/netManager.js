import axios from "axios"

export const getStreamItem = function (login) {
  return axios
    .get(
      `http://localhost:8000/api/stream/${login}`,
      { username: login },
      { withCredentials: true }
    )
    .then(function (response) {
      return response.data
    })
}
