import axios from "axios"
import { useAuthStore } from "../store/authStore"

const apiUrl = "https://randomuser.me/api/"

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
})

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export async function dummySubmit(data: Record<string, unknown>, id?: string) {
  await axiosInstance.get("?results=1&seed=fpv")
  console.log("Dummy submit:", id !== undefined ? { ...data, id } : data)
}

export async function getUser(page: number, pageSize: number) {
  const res = await axiosInstance.get(`?results=${pageSize}&page=${page}&seed=fpv`)
  return res.data.results as import("./userApiTypes").User[]
}

export default axiosInstance 