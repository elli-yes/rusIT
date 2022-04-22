import axios from "axios"

export default class StreamService {
  static async getStreamItem(login) {
    const res = await axios.get(
      `http://localhost:8000/api/stream/${login}`,
      {},
      { withCredentials: true }
    )
    return res.data
  }
}
