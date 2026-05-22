import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getUser } from '../api/axiosInstance'

export function useUsers(page: number, pageSize: number) {
  return useQuery({
    queryKey: ['users', page],
    queryFn: () => getUser(page, pageSize),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  })
}
