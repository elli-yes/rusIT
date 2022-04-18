import axios from "axios"

export const post = function () {
  console.log("AXIOS")
  axios
    .post("http://localhost:8000/token", {
      username: "artem12",
      password: "artem",
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
}
