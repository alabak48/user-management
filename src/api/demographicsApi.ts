import axiosInstance from './axiosInstance'
import type { GraphUser } from './types'

export type { GraphUser }

export interface AgeGroup {
  label: string
  male: number
  female: number
}

export interface DemographicsData {
  totalUsers: number
  averageAge: number
  maleCount: number
  femaleCount: number
  ageGroups: AgeGroup[]
}

type DemographicUser = Pick<GraphUser, 'gender' | 'dob'>
const AGE_GROUPS = [
  { label: '<20', min: 0, max: 19 },
  { label: '20-29', min: 20, max: 29 },
  { label: '30-39', min: 30, max: 39 },
  { label: '40-49', min: 40, max: 49 },
  { label: '50-59', min: 50, max: 59 },
  { label: '60-69', min: 60, max: 69 },
  { label: '70+', min: 70, max: Infinity },
] as const

function transformDemographics(users: DemographicUser[]): DemographicsData {
  let totalAge = 0
  let maleCount = 0
  let femaleCount = 0
  const ageGroups = AGE_GROUPS.map(({ label }) => ({ label, male: 0, female: 0 }))

  for (const { gender, dob: { age } } of users) {
    totalAge += age
    const isMale = gender === 'male'
    if (isMale) maleCount++
    else femaleCount++

    const groupIndex = AGE_GROUPS.findIndex(({ min, max }) => age >= min && age <= max)
    if (groupIndex !== -1) {
      if (isMale) ageGroups[groupIndex].male++
      else ageGroups[groupIndex].female++
    }
  }

  return {
    totalUsers: users.length,
    averageAge: users.length > 0 ? Math.round(totalAge / users.length) : 0,
    maleCount,
    femaleCount,
    ageGroups,
  }
}

export async function fetchDemographics(): Promise<DemographicsData> {
  const { data } = await axiosInstance.get<{ results: DemographicUser[] }>(
    '?results=200&inc=gender,dob'
  )
  return transformDemographics(data.results)
}

