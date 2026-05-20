import { useQuery } from '@tanstack/react-query'
import { getUser } from '../api/axiosInstance'

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
  })
}
