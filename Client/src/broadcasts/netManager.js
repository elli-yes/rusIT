import axios from "axios"
// export const refresh = function () {
//   console.log("AXIOS")
//   return axios
//     .post("http://localhost:8000/api/refresh-tokens", undefined, {
//       withCredentials: true,
//     })
//     .then(function (response) {
//       console.log(response)
//       return response
//     })
// }
export const getStreams = function () {
  console.log("AXIOS")
  return axios
    .get("http://localhost:8000/api/streams", {}, { withCredentials: true })
    .then(function (response) {
      // console.log(response.data.username)
      return response.data
    })
}
