'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import Text from '@/components/Elements/Title'
import { useEffect, useRef, useState } from 'react'
import RequestIndicator from '@/components/Elements/RequestIndicator'

export type AvgTempData = {
  [x: string]: {
    [key: number]: number
  }
}

export default function RadarChart({ data }: { data: AvgTempData }) {
  const [years, setYears] = useState<string[]>([])
  const [seriesData, setSeriesData] = useState<any[]>([])
  const [counter, setCounter] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const isPausedRef = useRef(isPaused)

  useEffect(() => {
    isPausedRef.current = isPaused
  }, [isPaused])

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPausedRef.current) {
        setCounter(prevCounter => prevCounter + 1)
      }
    }, 200)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const allYears = Object.keys(data)
    if (counter >= allYears.length) {
      setCounter(0)
      setYears([])
      return
    }
    const newYear = allYears[counter]
    setYears([...years, newYear])
  }, [counter])

  useEffect(() => {
    const mySeriesData = years?.slice(-10).map(y => {
      const year = data[y]
      const values = Object.keys(year).map(m => year[Number(m)])
      const avg = values.reduce((sum, val) => sum + val, 0) / values.length

      let color = ''

      const intensity = Math.min(1, avg / 5)
      const red = Math.round(255 * intensity)
      const green = Math.round(255 * (0.5 - intensity * 0.5))
      const blue = Math.round(255 * (1 - intensity))
      color = `rgb(${red},${green},${blue})`

      return {
        value: values.reverse(),
        name: y,
        areaStyle: {
          color,
          opacity: 0.25,
        },
        lineStyle: {
          width: 0,
          color,
        },
        itemStyle: {
          opacity: 0,
        },
      }
    })
    setSeriesData(mySeriesData)
  }, [years])

  if (!seriesData || !seriesData.length) {
    return (
      <div className="align-center flex h-full w-full justify-center">
        <RequestIndicator />
      </div>
    )
  }

  return (
    <div
      className="relative h-full w-full"
      onClick={() => setCounter(prevCounter => prevCounter + 1)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute flex h-full w-full items-center justify-center">
        <Text as={'h3'} className="z-10 text-white" font="bold">
          {years[years.length - 1]}
        </Text>
      </div>
      <ReactECharts
        option={{
          animation: false,
          radar: {
            splitNumber: 10,
            splitLine: {
              show: true,
              lineStyle: {
                color: [
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ff0000', // Null-Linie
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                  '#ccc',
                ],
                width: 1,
              },
            },
            axisLabel: {
              fontSize: '20px',
            },
            splitArea: {
              areaStyle: {
                color: ['#fff'],
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            shape: 'circle',
            indicator: [
              { name: 'JAN', min: -5, max: 5 },
              { name: 'FEB', min: -5, max: 5 },
              { name: 'MÄR', min: -5, max: 5 },
              { name: 'APR', min: -5, max: 5 },
              { name: 'MAI', min: -5, max: 5 },
              { name: 'JUN', min: -5, max: 5 },
              { name: 'JUL', min: -5, max: 5 },
              { name: 'AUG', min: -5, max: 5 },
              { name: 'SEP', min: -5, max: 5 },
              { name: 'OKT', min: -5, max: 5 },
              { name: 'NOV', min: -5, max: 5 },
              { name: 'DEZ', min: -5, max: 5 },
            ].reverse(),
          },
          series: [
            {
              name: 'Climate',
              type: 'radar',
              data: [
                // zero,
                ...seriesData,
              ],
            },
          ],
        }}
        renderer="svg"
      />
    </div>
  )
}
