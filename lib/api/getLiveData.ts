import { getCachedData } from '@/lib/content'

export default async function getLiveData(
  route: string,
  lifetime: number = 30,
  default_value: any = '',
) {
  const data = await getCachedData(`data?route=${route}&lifetime=${lifetime}`)
  return data || default_value
}
