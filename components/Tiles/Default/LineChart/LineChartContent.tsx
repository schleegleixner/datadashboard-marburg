'use client'

import { useEffect, useState } from 'react'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import { LineSeriesOption } from 'echarts'
import { parse } from 'date-fns'
import AxisLabel from '@/components/Tiles/Base/AxisLabel'
import useDevice from '@/hooks/useDevice'
import { InputDataType } from '@/utils/sources'
import { ChartProps, LineChartDataTypes } from './dt'
import { getString } from '@/utils/payload'
import { TableRow } from '@/types/tiles'
import { getThemeColor } from '@/utils/colors'
import {
  axisFormatter,
  chartFormatter,
  getStartAndEndYear,
  getTrendlineSeries,
} from '@/utils/chart'
import IndiciesToggle from '@/components/Tiles/Base/IndiciesToggle'
import { cx } from 'class-variance-authority'
import Text from '@/components/Elements/Text'

const getSplitSeries = (
  data: InputDataType[],
  property: keyof InputDataType,
) => {
  const aggregated_data: Record<string, number | null> = {}

  data.forEach(item => {
    const year = item.INDEX?.toString()
    const raw = item[property]?.toString()
    const value = raw && !isNaN(parseInt(raw, 10)) ? parseInt(raw, 10) : null
    if (
      !year ||
      isNaN(+year) ||
      year.length !== 4 ||
      +year < 1800 ||
      +year > 2100
    ) {
      return
    }
    aggregated_data[year] = value
  })

  const current_year = new Date().getFullYear()
  const sorted_years = Object.keys(aggregated_data).sort()
  const past_and_present: [number, number | null][] = []
  const future: { value: [number, number | null]; symbolSize: number }[] = []

  sorted_years.forEach(year => {
    const timestamp = new Date(`${year}-01-01T00:00:00.000Z`).getTime()
    const value = aggregated_data[year]

    if (value === null) {
      return
    }

    if (+year <= current_year) {
      past_and_present.push([timestamp, value])
    } else {
      if (future.length === 0 && past_and_present.length > 0) {
        const last_past = past_and_present[past_and_present.length - 1]
        future.push({
          value: last_past,
          symbolSize: 0,
        })
      }

      future.push({
        value: [timestamp, value],
        symbolSize: 7,
      })
    }
  })

  return { past_and_present, future }
}

/**
 * All the indices that are on the chart
 */
function getIndices(table_rows: TableRow[], data: InputDataType[]) {
  const filtered_indices: LineChartDataTypes = {}

  table_rows.forEach(row => {
    const { past_and_present, future } = getSplitSeries(data, row.key)
    const color = getThemeColor(row.variant ?? 'primary')

    filtered_indices[row.key] = {
      title: row.label ?? row.key,
      unit: row.unit ?? undefined,
      variant: row.variant ?? 'primary',
      visible: row.visible ?? undefined,
      icon: row.icon ?? undefined,
      seriesOption: [
        {
          name: row.label ?? row.key,
          data: past_and_present,
          color,
        },
        {
          name: row.label ?? row.key + ' (Prognose)',
          data: future,
          color,
          lineStyle: {
            type: 'dashed',
          },
        },
      ],
    }
  })

  return filtered_indices
}

export default function LineChartContent({
  tile_payload,
  switch: toggle,
  datasource,
}: ChartProps) {
  const device = useDevice()
  const [indicesState, setIndicesState] = useState<LineChartDataTypes | null>(
    null,
  )
  const [yearLimits, setYearLimits] = useState<{
    startYear: number | null
    endYear: number | null
  }>({
    startYear: null,
    endYear: null,
  })

  useEffect(() => {
    const limits = getStartAndEndYear(datasource.content)
    setYearLimits({
      startYear:
        limits.startYear !== null && !isNaN(Number(limits.startYear))
          ? Number(limits.startYear)
          : null,
      endYear:
        limits.endYear !== null && !isNaN(Number(limits.endYear))
          ? Number(limits.endYear)
          : null,
    })
    const indicies = getIndices(
      datasource.table_rows ?? [],
      datasource.content ?? [],
    )

    setIndicesState(prev => {
      // set visibility of indices
      Object.keys(indicies).forEach(key => {
        indicies[key].visible = indicies[key]?.visible ?? true
      })

      if (prev) {
        // merge with previous state
        Object.keys(prev).forEach(key => {
          if (indicies[key]) {
            indicies[key].visible = prev[key].visible
          }
        })
      }
      return indicies
    })
  }, [datasource])

  const toggleIndex = (key: string, visible: boolean) =>
    setIndicesState(prev => {
      if (!prev) {
        return prev
      }
      return {
        ...prev,
        [key]: { ...prev[key], visible },
      }
    })

  if (!yearLimits.startYear || !yearLimits.endYear || !indicesState) {
    return <></>
  }

  const series: LineSeriesOption[] = Object.keys(indicesState)
    .filter(key => indicesState[key]?.visible)
    .flatMap(key =>
      indicesState[key]?.seriesOption
        ? indicesState[key].seriesOption.map((opt, idx) => ({
            id: `${key}-${idx}`,
            type: 'line',
            symbol: 'circle',
            showAllSymbol: true,
            symbolSize: 7,
            areaStyle: {
              color: getThemeColor(indicesState[key].variant ?? 'primary'),
              opacity: 0.05,
            },
            itemStyle: {
              opacity: 1,
              borderColor: '#fff',
              borderWidth: 2,
            },
            ...opt,
          }))
        : [],
    )

  const trendlineSeries = getTrendlineSeries({ series })
  const activeToggleCount = Object.values(indicesState).filter(
    index => index.visible,
  ).length

  return (
    <div
      className={cx(
        'flex w-full flex-col items-center rounded bg-white py-4',
        tile_payload.layout === 'full' ? '2xl:flex-row' : '',
      )}
    >
      <div className="h-full w-full flex-1">
        <div className="flex items-center justify-between gap-8">
          <AxisLabel>
            {datasource.labely ?? getString(tile_payload, 'chart_title')}
          </AxisLabel>
          {toggle}
        </div>

        <div className="relative h-[235px] w-full md:h-[440px]">
          <ReactECharts
            option={{
              grid: {
                top: 10,
                bottom: 40,
                left: 60,
                right: 10,
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
                  fontSize: device === 'mobile' ? 12 : 16,
                },
                min: parse(
                  `${yearLimits.startYear}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                max: parse(
                  `${yearLimits.endYear}-01-01`,
                  'yyyy-MM-dd',
                  new Date(),
                ).getTime(),
                axisTick: {
                  length: 6,
                },
                splitLine: {
                  show: true,
                },
              },
              yAxis: {
                type: 'value',
                min: axisValues => {
                  const realMin = axisValues.min
                  if (!isFinite(realMin) || realMin <= 0) {
                    return 0
                  }

                  const power = Math.floor(Math.log10(realMin))
                  const base = Math.pow(10, power)
                  const step = base
                  const withBuffer = realMin * 0.8
                  const niceMin = Math.floor(withBuffer / step) * step
                  return niceMin
                },
                axisLabel: {
                  fontSize: device === 'mobile' ? 10 : 12,
                  formatter: axisFormatter,
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
      {Object.keys(indicesState).length > 1 ? (
        <IndiciesToggle
          className={cx(
            tile_payload.layout === 'full'
              ? ''
              : '2xl:max-w-[800px] 2xl:grid-cols-2',
          )}
          indices={indicesState}
          onToggle={toggleIndex}
        />
      ) : (
        <div className="flex items-center gap-2 p-4">
          <div
            className={`h-1 w-8 rounded bg-${indicesState[Object.keys(indicesState)[0]].variant} md:w-[52px]`}
          />
          <Text
            as={'h5'}
            variant={indicesState[Object.keys(indicesState)[0]].variant}
          >
            {indicesState[Object.keys(indicesState)[0]].title}
          </Text>
        </div>
      )}
    </div>
  )
}
