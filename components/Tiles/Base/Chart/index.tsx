'use client'

import { ReactECharts } from '@/components/Charts/ReactECharts'
import { SeriesOption } from 'echarts'
import AxisLabel from '@/components/Tiles/Base/AxisLabel'
import {
  categorizeSeriesData,
  getTimelineFromSeries,
  getTrendlineSeries,
  useContentWidth,
} from '@schleegleixner/react-statamic-api'
import { ChartProps } from './dt'
import { axisFormatter } from '@schleegleixner/react-statamic-api'
import { getThemeColor } from '@/utils/colors'
import { chartTooltipFormatter, useChartIndices } from '@/utils/chart'
import IndiciesToggle from '@/components/Tiles/Base/IndiciesToggle'
import { cx } from 'class-variance-authority'
import Text from '@/components/Elements/Text'
import Spinner from '@/components/Elements/Spinner'
import { format } from 'date-fns'

export default function Chart({
  chart_type,
  title,
  layout = 'default',
  stacked = false,
  switch: toggle,
  datasource,
  categorize = false
}: ChartProps) {
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const { indicesState, toggleIndex } = useChartIndices(datasource, chart_type)
  const font_size_x = contentWidth > 900 ? 20 : contentWidth > 600 ? 18 : 16
  const font_size_y = contentWidth > 900 ? 16 : contentWidth > 600 ? 14 : 12

  if (!indicesState) {
    return (
      <div className="w-full" ref={elRef}>
        <Spinner className="m-auto my-8" />
      </div>
    )
  }

  const series: SeriesOption[] = !indicesState
    ? []
    : Object.keys(indicesState)
        .filter(key => indicesState[key]?.visible)
        .flatMap(key =>
          indicesState[key]?.seriesOption
            ? indicesState[key].seriesOption.map((opt, idx) => {
                const is_future = (opt as any).lineStyle?.type === 'dashed'
                const baseSeries = {
                  id: `${key}-${idx}`,
                  type: chart_type,
                  stack: stacked
                    ? is_future
                      ? 'future'
                      : 'current'
                    : undefined,
                  symbol: 'circle',
                  showAllSymbol: true,
                  symbolSize: 7,
                  areaStyle: {
                    color: getThemeColor(
                      indicesState[key].variant ?? 'primary',
                    ),
                    opacity: 0.05,
                  },
                  itemStyle: {
                    opacity: 1,
                    borderColor: '#fff',
                    borderWidth: chart_type === 'line' ? 2 : 0,
                  },
                  connectNulls: categorize,
                  ...opt,
                }
                return baseSeries as SeriesOption
              })
            : [],
        )

  const active_indices = Object.values(indicesState).filter(
    index => index.visible,
  )

  const isBarChart = chart_type === 'bar'
  const timeline = getTimelineFromSeries(series)

  const trendlineStyle: SeriesOption = {
    lineStyle: {
      type: 'dotted',
      color: getThemeColor('primary'),
      opacity: 0.3,
    },
  }

  const trendline_series =
    (stacked && active_indices.length) ||
    (active_indices.length === 1 && !active_indices[0].hide_trend)
      ? getTrendlineSeries(series, trendlineStyle, categorize ? timeline : undefined)
      : null

  const series_data = categorize ? categorizeSeriesData(series, timeline, false) : series
  
  const xAxis = categorize
    ? {
        type: 'category' as const,
        data: timeline,
        boundaryGap: isBarChart,
        axisLabel: {
          fontSize: font_size_x,
          showMaxLabel: true,
          formatter: (value: string) => value,
        },
        splitLine: { show: !isBarChart },
        axisTick: { length: 6, alignWithLabel: true },
      }
    : {
        type: 'time' as const,
        axisLabel: {
          fontSize: font_size_x,
          showMaxLabel: true,
          formatter: (value: number) => format(new Date(value), 'yyyy'),
        },
        splitLine: { show: !isBarChart },
        axisTick: { length: 6 },
      }

  return (
    <div
      className={cx(
        'flex w-full flex-col items-center rounded bg-transparent py-4',
        layout === 'full' ? '' : '',
      )}
      ref={elRef}
    >
      <div className="h-full w-full flex-1">
        <div className="flex items-center justify-between gap-8">
          <AxisLabel>{datasource.labely ?? title}</AxisLabel>
          {toggle}
        </div>
        <div className="relative h-[235px] w-full md:h-[440px]">
          <ReactECharts
            option={{
              grid: {
                top: 10,
                bottom: 40,
                left: 60,
                right: 20,
              },
              tooltip: {
                trigger: 'axis',
                confine: true,
                formatter: params =>
                  chartTooltipFormatter(params, indicesState, datasource.year_marker),
                axisPointer: {
                  type: isBarChart ? 'shadow' : 'line',
                },
              },
              series: [
                ...series_data,
                ...(trendline_series ? [trendline_series] : []),
              ],
              xAxis,
              yAxis: {
                type: 'value',
                min: datasource.axisy_minimum ?? null,
                axisLabel: {
                  fontSize: font_size_y,
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
        <IndiciesToggle indices={indicesState} onToggle={toggleIndex} />
      ) : (
        <div className="flex items-center gap-2 p-4">
          <div
            className={`h-1 w-8 rounded bg-${indicesState[Object.keys(indicesState)[0]].variant}`}
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
