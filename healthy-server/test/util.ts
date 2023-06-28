import axios from "axios"

const baseURL = `http://localhost:4015`

const request = axios.create({
  baseURL,
  timeout: 6000,
  headers: {
    Cookie: "token=e300a37a542de7f8f03b7a3e",
  },
})

export { request }
