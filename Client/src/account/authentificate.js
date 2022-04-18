import axios from "axios"

export const post = function () {
  console.log("AXIOS")
  axios({
    method: "post",
    url: "http://localhost:8000/token",
    data: {
      username: "artem1",
      password: "artem",
    },
  })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
