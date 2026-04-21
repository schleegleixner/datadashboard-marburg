'use client'

import {
  numberFormat,
  TilePayloadType,
} from '@schleegleixner/react-statamic-api'
import { ReactECharts } from '@/components/Charts/ReactECharts'
import { PopulationData } from './dt'
import { SeriesOption } from 'echarts'
import AxisLabel from '@/components/Tiles/Base/AxisLabel'
import { TileDatasourceType } from '@schleegleixner/react-statamic-api'

const labelColumn = 'INDEX'

const dataColumns = [
  {
    key: 'men',
    label: 'Männer',
    data_key: 'M gesamt',
    modifier: -1,
    color: '#163455',
  },
  {
    key: 'women',
    label: 'Frauen',
    data_key: 'W gesamt',
    modifier: 1,
    color: '#d12914',
  },
]

const getLabels = (data: any[]) => {
  return data.map(item => item[labelColumn])//.slice(0, -1)
}

const getSeries = (data: any[]) => {
  return dataColumns.map(column => {
    return {
      name: column.label,
      type: 'bar',
      color: column.color,
      stack: 'total',
      barWidth: '90%',
      label: {
        show: true,
        fontSize: 12,
        formatter: (params: any) => numberFormat(Math.abs(params.value)),
      },
      data: data
        //.slice(0, -1)
        .map(item => item[column.data_key] * column.modifier),
    }
  })
}

export default function Content({
  tile_payload,
  datasource,
}: {
  datasource: TileDatasourceType
  tile_payload: TilePayloadType
}) {
  const data = datasource.content as PopulationData[]
  const labels = getLabels(data ?? [])
  const series = getSeries(data ?? [])

  if (!labels.length || !series.length) {
    return <div>Keine Daten verfügbar.</div>
  }

  return (
    <div className="aspect-square w-full max-h-[600px]">
      <div className="flex items-center justify-between gap-8">
        <AxisLabel>{'Altersgruppe'}</AxisLabel>
      </div>
      <ReactECharts
        option={{
          grid: {
            top: 5,
            right: 10,
            left: 10,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
            formatter: (params: any) => {
              const label = params[0]?.axisValue
              let result = `<b>Altersgruppe: ${label}</b><br/><hr class="my-2" />`
              params.forEach((item: any) => {
                result += `${item.marker} ${item.seriesName}: ${numberFormat(Math.abs(item.value))}<br/>`
              })
              return result
            },
          },
          legend: {
            data: dataColumns.map(column => column.label),
          },
          xAxis: [
            {
              type: 'value',
              axisLabel: {
                formatter: (value: number) => numberFormat(Math.abs(value)),
              },
            },
          ],
          yAxis: [
            {
              type: 'category',
              axisTick: {
                show: false,
              },
              data: labels,
            },
          ],
          series: series as SeriesOption[],
        }}
      ></ReactECharts>
    </div>
  )
}
