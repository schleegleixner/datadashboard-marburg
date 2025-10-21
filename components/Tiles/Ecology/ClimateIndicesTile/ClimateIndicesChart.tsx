'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { LineSeriesOption } from 'echarts'
import { getYear, parse } from 'date-fns'
import { useEffect, useState } from 'react'
import useDevice from '@/hooks/useDevice'
import * as Icons from '@/components/Icons/Klima'
import {
  ClimateIndex,
  ClimateIndices,
  ClimateIndicesChartProps,
  IndicesTypes,
} from './dt'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { getThemeColor } from '@/utils/colors'
import { chartFormatter, getTrendlineSeries } from '@/utils/chart'
import AxisLabel from '@/components/Tiles/Base/AxisLabel'

const colorLookup: Record<
  IndicesTypes,
  'blue' | 'primary' | 'economy' | 'green' | 'society'
> = {
  eistage: 'blue',
  frosttage: 'primary',
  heisse_tage: 'society',
  sommertage: 'green',
  tropennaechte: 'economy',
}
import IndiciesToggle from '@/components/Tiles/Base/IndiciesToggle'

const STARTING_YEAR = 1990

const getSeries = (data: ClimateIndex[], property: keyof ClimateIndex) => {
  const arr = data
    .filter(e => new Date(e.timestamp).getFullYear() >= STARTING_YEAR)
    .map(e => [
      parse(e.timestamp, 'yyyy-MM-dd HH:mm:ssXXX', new Date()),
      e[property],
    ])
    .reduce((acc: Record<string, number>, [timestamp, value]) => {
      const year = getYear(timestamp as Date)

      // if current year, ignore
      if (year === new Date().getFullYear()) {
        return acc
      }

      acc[year] = (acc[year] ?? 0) + (value as number)

      return acc
    }, {})

  return Object.entries(arr).map(([year, value]) => [
    `${year}-01-01T00:00:00.000Z`,
    value,
  ])
}

// all the indices that are on the chart
function getIndices(data: ClimateIndex[]): ClimateIndices {
  return {
    heisse_tage: {
      title: 'Heiße Tage (>= 30°C)',
      icon: Icons.MsKlimadashboardIconsKlimakenntageHeiss,
      variant: 'society',
      visible: true,
      seriesOption: {
        name: 'Heiße Tage',
        data: getSeries(data, 'heisse_tage'),
        color: getThemeColor('society'),
      },
    },
    sommertage: {
      title: 'Sommertage (>= 25°C)',
      icon: Icons.MsKlimadashboardIconsKlimakenntageSommer,
      variant: 'green',
      visible: false,
      seriesOption: {
        name: 'Sommertage',
        data: getSeries(data, 'sommertage'),
        color: getThemeColor('green'),
      },
    },
    tropennaechte: {
      title: 'Tropennächte (>= 20°C)',
      icon: Icons.MsKlimadashboardIconsKlimakenntageTropennacht,
      variant: 'economy',
      visible: false,
      seriesOption: {
        name: 'Tropennächte',
        data: getSeries(data, 'tropennaechte'),
        color: getThemeColor('economy'),
      },
    },
    frosttage: {
      title: 'Frosttage (Min. < 0°C)',
      variant: 'primary',
      visible: false,
      seriesOption: {
        name: 'Frosttage',
        data: getSeries(data, 'frosttage'),
        color: getThemeColor('primary'),
      },
      icon: Icons.MsKlimadashboardIconsKlimakenntageFrost,
    },
    eistage: {
      title: 'Eistage (Max. < 0°C)',
      icon: Icons.MsKlimadashboardIconsKlimakenntageEis,
      variant: 'blue',
      visible: false,
      seriesOption: {
        name: 'Eistage',
        data: getSeries(data, 'eistage'),
        color: getThemeColor('blue'),
      },
    },
  }
}

/**
 *
 * @returns The Climate Indices Chart
 */
export default function ClimateIndicesChart({
  data,
}: ClimateIndicesChartProps) {
  const device = useDevice()

  const [indicesState, setIndicesState] = useState<ClimateIndices | null>(null)

  useEffect(() => {
    if (data) {
      setIndicesState(getIndices(data))
    }
  }, [data])

  if (!indicesState) {
    return (
      <div className="align-center flex h-full w-full justify-center">
        <RequestIndicator />
      </div>
    )
  }

  const toggleIndex = (key: string, visible: boolean) =>
    setIndicesState(prev => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        [key as IndicesTypes]: { ...prev[key as IndicesTypes], visible },
      }
    })

  const series: LineSeriesOption[] = Object.keys(indicesState)
    .filter(key => indicesState[key as IndicesTypes]?.visible)
    .map(e => ({
      ...indicesState[e as IndicesTypes].seriesOption,
      type: 'line',
      itemStyle: {
        opacity: 1,
        borderColor: '#fff',
        borderWidth: 2,
      },
      symbol: 'circle',
      showAllSymbol: true,
      symbolSize: 7,
      areaStyle: {
        color: getThemeColor(colorLookup[e as IndicesTypes] ?? 'primary'),
        opacity: 0.05,
      },
      data: indicesState[e as IndicesTypes].seriesOption.data?.filter(
        // @ts-ignore
        ([date, _val]) => getYear(new Date(date)) !== new Date().getFullYear(),
      ),
    }))

  const trendlineSeries = getTrendlineSeries({ series })
  const activeToggleCount = Object.values(indicesState).filter(
    index => index.visible,
  ).length

  return (
    <div className="flex h-full w-full flex-col items-center py-4 2xl:flex-row">
      <div className="h-full w-full flex-1">
        <AxisLabel>Anzahl der Tage</AxisLabel>
        <div className="h-[235px] w-full md:h-[440px]">
          <ReactECharts
            option={{
              grid: {
                top: 20,
                bottom: 40,
                left: 40,
                right: 40,
              },
              tooltip: {
                trigger: 'axis',
                formatter: params => chartFormatter(params, indicesState),
              },
              series: [
                ...series,
                ...(activeToggleCount === 1 ? [trendlineSeries] : []),
              ],
              xAxis: {
                type: 'time',
                axisLabel: {
                  fontSize: device === 'mobile' ? 12 : 20,
                },
                min: parse(
                  `${STARTING_YEAR}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                max: parse(
                  `${new Date().getFullYear()}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                splitLine: {
                  show: true,
                },
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  fontSize: device === 'mobile' ? 12 : 20,
                  formatter: (val: any) => {
                    if (val === 0) {
                      return ''
                    }
                    return val
                  },
                },
              },
              animation: true,
            }}
            settings={{
              notMerge: true,
            }}
          />
        </div>
      </div>

      <IndiciesToggle indices={indicesState} onToggle={toggleIndex} />
    </div>
  )
}
