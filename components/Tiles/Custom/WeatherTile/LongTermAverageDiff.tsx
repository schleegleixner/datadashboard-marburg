import AnimatedNumber from '@/components/Elements/Animated/AnimatedNumber'
import Title from '@/components/Elements/Title'
import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import Divider from '@/components/Elements/Divider'
import { useEffect, useState } from 'react'

export default function LongTermAverageDiff() {
  const [difference, setDifference] = useState<number | null>(null)

  async function getData() {
    try {
      // TBD: fetch data from API if provided
      setDifference(null)
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

  return (
    <div>
      <Divider />
    <Title as={'h4'}>
      <span className="text-ecology">
        <AnimatedNumber decimals={2}>{Math.abs(difference)}</AnimatedNumber>{' '}
        Grad {difference > 0 ? 'wärmer' : 'kälter'}
      </span>{' '}
      ist der{' '}
      <span className="text-ecology">
        {format(new Date(), 'LLLL', { locale: de })}
      </span>{' '}
      bisher im Vergleich zum langjährigen Mittel (1961-1990).
    </Title>
    </div>

  )
}
