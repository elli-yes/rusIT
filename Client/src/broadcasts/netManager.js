import axios from "axios"

export const getStreams = function () {
  return axios
    .get("http://localhost:8000/api/streams", {}, { withCredentials: true })
    .then(function (response) {
      return response.data
    })
}
