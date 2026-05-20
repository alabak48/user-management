import axios from "axios"

const apiUrl = "https://randomuser.me/api/"

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})

export async function getUser() {
  const res = await axiosInstance.get("?results=20&seed=fpv")
  return res.data.results
}

export default axiosInstance 