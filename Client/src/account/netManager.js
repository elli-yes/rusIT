import axios from "axios"

export const login = function (login, password) {
  console.log(login, password)
  return axios
    .post(
      "http://localhost:8000/login",
      {
        username: login,
        password: password,
      },
      { withCredentials: true }
    )
    .then(function (response) {
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
      console.log(response.data.access_token)
      console.log(response.data.refresh_token)
      return response.data
    })
}
export const refresh = function () {
  console.log("AXIOS")
  return axios
    .post("http://localhost:8000/refresh-tokens", undefined, {
      withCredentials: true,
    })
    .then(function (response) {
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
      console.log(response)
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
}
export const usersMe = function () {
  console.log("AXIOS")
  return axios
    .get("http://localhost:8000/users/me", {}, { withCredentials: true })
    .then(function (response) {
      console.log(response.data.username)
      return response.data.username
    })
}
export const newUser = function (login, password) {
  console.log("AXIOS")
  return axios
    .post(
      "http://localhost:8000/users/",
      { username: login, password: password },
      { withCredentials: true }
    )
    .then(function (response) {
      console.log(response.data)
      return response.data
    })
}
// export const post1 = function () {
//   console.log("AXIOS")
//   axios
//     .post("http://localhost:8000/login", {
//       username: "artem1",
//       password: "artem",
//     })
//     .then(function (response) {
//       console.log(response)
//     })
//     .catch(function (error) {
//       console.log(error)
//     })
// }
