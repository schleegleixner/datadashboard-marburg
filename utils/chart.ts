import { InputDataType } from '@/utils/sources'
import { LineSeriesOption } from 'echarts'
import { getThemeColor } from '@/utils/colors'

type Index = {
  title: string
  unit?: string
  [key: string]: any
}

// chartFormatter formats the tooltip for the chart
export const chartFormatter = (params: any, indices: Record<string, Index>) => {
  const seen = new Set<string>()

  params = params.filter(
    (item: any, index: number, self: any[]) =>
      index ===
      self.findIndex((obj: any) => obj.seriesName === item.seriesName),
  )

  return params
    .map((param: any, index: number) => {
      const marker = param.marker
      const seriesName = param.seriesName
      const value = param.value[1]?.toLocaleString('de-DE')
      const unit =
        Object.values(indices).find(i => i.title === seriesName)?.unit ?? ''

      if (seen.has(seriesName) || seriesName === 'Trend') {
        return
      }
      seen.add(seriesName)

      if (index === 0) {
        const year = new Date(param.value[0]).getFullYear()
        return `<b>${year}</b><br/>${marker}${seriesName}: ${value} ${unit}`
      }
      return `${marker}${seriesName}: ${value} ${unit}`
    })
    .join('<br/>')
}

export const axisFormatter = (value: number | string) => {
  if (typeof value === 'number') {
    if (value === 0) {
      return ''
    }
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }
  return value
}

// getStartAndEndYear extracts the start and end year from the data
export const getStartAndEndYear = (
  data: InputDataType[],
): { startYear: string | null; endYear: string | null } => {
  const years = data
    .map(item => parseInt(item.INDEX?.toString(), 10)) // konvertiere Jahr in Zahl
    .filter(year => !isNaN(year) && year >= 1800 && year <= 2100) // filtere nur gültige Jahre

  if (years.length === 0) {
    return { startYear: null, endYear: null } // fallback, falls keine gültigen Jahre vorhanden sind
  }

  return {
    startYear: Math.min(...years).toString(),
    endYear: Math.max(...years).toString(),
  }
}

// calculate the trendline using linear regression
export const calculateTrendline = (
  data: [string, number][],
): [number, number][] => {
  // filter out invalid data points
  const isValidDataPoint = (item: any): item is [number, string | number] => {
    if (!Array.isArray(item) || item.length !== 2) return false
    return true
  }
  data = data.filter(isValidDataPoint)

  const n = data.length

  if (n === 0) {
    return []
  }

  const parseDate = (date: string | number): number =>
    typeof date === 'number' ? date : new Date(date).getTime()

  const sumX = data.reduce((acc, [date]) => acc + parseDate(date), 0)
  const sumY = data.reduce((acc, [, value]) => acc + value, 0)
  const sumXY = data.reduce(
    (acc, [date, value]) => acc + parseDate(date) * value,
    0,
  )
  const sumX2 = data.reduce(
    (acc, [date]) => acc + Math.pow(parseDate(date), 2),
    0,
  )

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - Math.pow(sumX, 2))
  const intercept = (sumY - slope * sumX) / n

  return data.map(([date]) => {
    const x = new Date(date).getTime()
    const y = slope * x + intercept
    return [x, y]
  })
}

// getTrendlineSeries generates a trendline series based on the provided line series data
export const getTrendlineSeries = ({
  series,
}: {
  series: LineSeriesOption[]
}): LineSeriesOption => {
  const trendlineData = calculateTrendline(
    [...series].flatMap(s => s.data) as [string, number][],
  )
  const trendlineColor = getThemeColor('primary')

  const trendlineSeries: LineSeriesOption = {
    type: 'line',
    data: trendlineData,
    name: 'Trend',
    smooth: true,
    lineStyle: {
      type: 'dotted',
      color: trendlineColor,
      opacity: 0.3,
    },
    symbol: 'none', // hide small circles on the trendline initially
    emphasis: {
      lineStyle: {
        opacity: 1, // change color on hover
      },
    },
    markLine: {},
  }

  return trendlineSeries
}
