import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Text from '@/components/Elements/Text'
import { subDays, startOfDay } from 'date-fns'
import { useEffect, useState } from 'react'
import daily_long_term_average from './daily-long-term-average.json'
import getWeather from '@/lib/brightsky'
import { CITY_COORDINATES } from '@/lib/constants'

export default function LongTermAverageDiff({ text, duration = 30 }: { text: string, duration?: number }) {
  const [difference, setDifference] = useState<number | null>(null)

  async function getData() {
    try {
      const today = startOfDay(new Date())
      const days: Date[] = []

      // Get the last {duration} days
      for (let i = 1; i <= duration; i++) {
        days.push(subDays(today, i))
      }

      // Get the long term average for the last {duration} days
      const longTermAverages = days.map(date => {
        const day = date.getDate()
        const month = date.getMonth() + 1
        const entry = daily_long_term_average.find(
          e => e.day === day && e.month === month,
        )
        return entry?.value ?? 0
      })
      const longTermAverage =
        longTermAverages.reduce((a, b) => a + b, 0) / longTermAverages.length

      // Get the temperature for the last {duration} days from the API
      const weatherPromises = days.map(date =>
        getWeather(CITY_COORDINATES, date),
      )
      const weatherResponses = await Promise.all(weatherPromises)

      // Calculate daily averages and then overall average
      const dailyTemperatures = weatherResponses.map(response => {
        const temps = response.weather
          .map(w => w.temperature)
          .filter(t => t !== null)
        return temps.reduce((a, b) => a + b, 0) / temps.length
      })
      const actualAverage =
        dailyTemperatures.reduce((a, b) => a + b, 0) / dailyTemperatures.length

      // Set difference
      setDifference(actualAverage - longTermAverage)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Couldn't fetch long term average difference", error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  if (difference === null) {
    return null
  }

  const differenceTag = (
    <span className="text-ecology font-bold">
      <AnimatedNumber decimals={2}>{Math.abs(difference)}</AnimatedNumber>{' '}
      Grad {difference > 0 ? 'wärmer' : 'kälter'}
    </span>
  )

  const parts = text.split('[DIFFERENCE]')

  return (
    <div>
      <Text as={'h4'}>
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 && differenceTag}
          </span>
        ))}
      </Text>
    </div>
  )
}
