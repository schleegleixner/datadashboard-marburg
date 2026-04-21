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

const transformSeriesForReversedAxis = (serie: SeriesOption): SeriesOption => {
  const data = (serie as any).data
  if (!data) return serie

  return {
    ...serie,
    data: data.map((point: any) => {
      if (Array.isArray(point) && point.length >= 2) {
        const [x, y, ...rest] = point
        return [y, x, ...rest]
      }
      if (point?.value && Array.isArray(point.value) && point.value.length >= 2) {
        const [x, y, ...rest] = point.value
        return { ...point, value: [y, x, ...rest] }
      }
      return point
    }),
  }
}

const reverseSeriesDataOrder = (serie: SeriesOption): SeriesOption => {
  const data = (serie as any).data
  return Array.isArray(data) ? { ...serie, data: [...data].reverse() } : serie
}

export default function Chart({
  chart_type,
  title,
  layout = 'default',
  reverse_axis = false,
  stacked = false,
  switch: toggle,
  datasource,
  categorize = false,
}: ChartProps) {
  const { elRef, contentWidth } = useContentWidth<HTMLDivElement>()
  const { indicesState, toggleIndex } = useChartIndices(datasource, chart_type)
  
  const is_bar = chart_type === 'bar'
  const should_categorize = is_bar || categorize || reverse_axis
  const font_size_x = contentWidth > 900 ? 20 : contentWidth > 600 ? 18 : 16
  const font_size_y = contentWidth > 900 ? 16 : contentWidth > 600 ? 14 : 12

  if (!indicesState) {
    return (
      <div className="w-full" ref={elRef}>
        <Spinner className="m-auto my-8" />
      </div>
    )
  }

  const series: SeriesOption[] = Object.entries(indicesState)
    .filter(([, state]) => state?.visible)
    .flatMap(([key, state]) =>
      (state.seriesOption ?? []).map((opt, idx) => ({
        id: `${key}-${idx}`,
        type: chart_type,
        stack: stacked ? ((opt as any).lineStyle?.type === 'dashed' ? 'future' : 'current') : undefined,
        symbol: 'circle',
        showAllSymbol: true,
        symbolSize: 7,
        areaStyle: { color: getThemeColor(state.variant ?? 'primary'), opacity: 0.05 },
        itemStyle: { opacity: 1, borderColor: '#fff', borderWidth: chart_type === 'line' ? 2 : 0 },
        connectNulls: should_categorize,
        ...opt,
      } as SeriesOption))
    )

  const active_indices = Object.values(indicesState).filter(i => i.visible)
  const timeline = getTimelineFromSeries(series, !reverse_axis)
  
  const trendline_series =
    (stacked && active_indices.length) || (active_indices.length === 1 && !active_indices[0].hide_trend)
      ? getTrendlineSeries(series, {
          lineStyle: { type: 'dotted', color: getThemeColor('primary'), opacity: 0.3 },
        }, should_categorize ? timeline : undefined)
      : null

  const series_data = should_categorize ? categorizeSeriesData(series, timeline, false) : series

  // Basis-Konfigurationen für Achsen
  const category_axis = {
    type: 'category' as const,
    data: reverse_axis ? [...timeline].reverse() : timeline,
    boundaryGap: is_bar,
    axisLabel: { fontSize: reverse_axis ? font_size_y : font_size_x, showMaxLabel: true },
    splitLine: { show: !is_bar },
    axisTick: { length: 6, alignWithLabel: is_bar },
  }

  const value_axis = {
    type: 'value' as const,
    min: datasource.axisy_minimum ?? null,
    axisLabel: { fontSize: reverse_axis ? font_size_x : font_size_y, formatter: axisFormatter },
    splitLine: { show: true },
    axisTick: { length: 6 },
  }

  const time_axis = {
    type: 'time' as const,
    axisLabel: {
      fontSize: reverse_axis ? font_size_y : font_size_x,
      showMaxLabel: true,
      formatter: (value: number) => format(new Date(value), 'yyyy'),
    },
    splitLine: { show: !is_bar },
    axisTick: { length: 6 },
  }

  const xAxis = reverse_axis ? value_axis : (should_categorize ? category_axis : time_axis)
  const yAxis = reverse_axis ? (should_categorize ? category_axis : time_axis) : value_axis

  const combined_series: SeriesOption[] = reverse_axis
    ? [...series_data, ...(trendline_series ? [trendline_series] : [])]
        .map(s => should_categorize ? reverseSeriesDataOrder(transformSeriesForReversedAxis(s)) : transformSeriesForReversedAxis(s))
    : [...series_data, ...(trendline_series ? [trendline_series] : [])]

  const first_index = indicesState[Object.keys(indicesState)[0]]

  return (
    <div className={cx('flex w-full flex-col items-center rounded bg-transparent py-4', layout === 'full' ? '' : '')} ref={elRef}>
      <div className="h-full w-full flex-1">
        <div className="flex items-center justify-between gap-8">
          <AxisLabel>{datasource.labely ?? title}</AxisLabel>
          {toggle}
        </div>
        <div className="relative h-[235px] w-full md:h-[440px]">
          <ReactECharts
            option={{
              grid: { top: 10, bottom: 40, left: 60, right: 20 },
              tooltip: {
                trigger: 'axis',
                confine: true,
                formatter: params => chartTooltipFormatter(params, indicesState, datasource.year_marker),
                axisPointer: { type: is_bar ? 'shadow' : 'line' },
              },
              series: combined_series,
              xAxis,
              yAxis,
              animation: true,
            }}
            settings={{ notMerge: true }}
          />
        </div>
      </div>
      {Object.keys(indicesState).length > 1 ? (
        <IndiciesToggle indices={indicesState} onToggle={toggleIndex} />
      ) : (
        <div className="flex items-center gap-2 p-4">
          <div className={`h-1 w-8 rounded bg-${first_index.variant}`} />
          <Text as="h5" variant={first_index.variant}>{first_index.title}</Text>
        </div>
      )}
    </div>
  )
}
