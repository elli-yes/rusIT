import axios from "axios"

// export const login = function (login, password) {
//   return axios
//     .post(
//       "http://localhost:8000/api/login",
//       {
//         username: login,
//         password: password,
//       },
//       { withCredentials: true }
//     )
//     .then(function (response) {
//       axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
//       return response.data
//     })
// }
export const logout = function () {
  return axios
    .post("http://localhost:8000/api/logout", {}, { withCredentials: true })
    .then(function (response) {
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
}
export const refresh = function () {
  return axios
    .post("http://localhost:8000/api/refresh-tokens", undefined, {
      withCredentials: true,
    })
    .then(function (response) {
      axios.defaults.headers.common.Authorization = `Bearer ${response.data.access_token}`
      return response
    })
    .catch(function (error) {
      console.log(error)
    })
}
export const usersMe = function () {
  return axios
    .get("http://localhost:8000/api/users/me", {}, { withCredentials: true })
    .then(function (response) {
      return response.data
    })
}
export const newUser = function (login, password) {
  return axios
    .post(
      "http://localhost:8000/api/users/",
      { username: login, password: password },
      { withCredentials: true }
    )
    .then(function (response) {
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
