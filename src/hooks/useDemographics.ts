import { useQuery } from '@tanstack/react-query'
import { fetchDemographics } from '../api/demographicsApi'

export function useDemographics() {
  return useQuery({
    queryKey: ['demographics'],
    queryFn: fetchDemographics,
    staleTime: 5 * 60 * 1000,
  })
}
