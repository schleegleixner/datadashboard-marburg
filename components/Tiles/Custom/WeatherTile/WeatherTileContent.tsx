'use client'

import Title from '@/components/Elements/Title'
import useWeather from '@/hooks/useWeather'
import { conditionMapping, conditionMappingIcon } from '@/lib/brightsky'
import Phenomenon from '@/components/Elements/Phenomenon'
import {
  IconWeatherAtmosphaere,
  IconWeatherWindgeschw,
} from '@/components/Icons/Weather'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import { useApi } from '@schleegleixner/react-statamic-api'
import Divider from '@/components/Elements/Divider'
import Slider from '@/components/Inputs/Slider/'
import { addHours, format } from 'date-fns'
import { useMemo, useState } from 'react'
import Spacer from '@/components/Elements/Spacer'
import { CITY_COORDINATES } from '@/lib/constants'

type PerceivedTemperatureEntry = {
  time: string
  temperature: number
}

export default function WeatherTileContent() {
  const [timestamp, setTimestamp] = useState(new Date())
  const weather = useWeather(CITY_COORDINATES, timestamp)
  const { data: perceived_temperature, status } = useApi<
    PerceivedTemperatureEntry[] | null
  >('dwd/perceived_temperature/hourly', 10)

  // search for the perceived temperature for the current timestamp
  const currentPerceivedTemperature = useMemo(() => {
    if (!perceived_temperature || perceived_temperature.length === 0)
      return null

    const formattedTimestamp = format(timestamp, 'yyyy-MM-dd HH:00')

    const entry = perceived_temperature.find(e => e.time === formattedTimestamp)
    return entry?.temperature ?? null
  }, [perceived_temperature, timestamp])

  const nextHours = new Array(6).fill(undefined).map((e, i) => {
    const date = new Date()
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return addHours(date, i)
  })

  function getWindDirection(degrees: number): string {
    const directions: string[] = ['N', 'NO', 'O', 'SO', 'S', 'SW', 'W', 'NW']
    const index: number =
      Math.round(((degrees %= 360) < 0 ? degrees + 360 : degrees) / 45) % 8
    return directions[index]
  }

  if (!weather) {
    return <RequestIndicator />
  }

  const Icon = conditionMappingIcon[weather?.condition]

  return (
    <div>
      {weather && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-1 items-center gap-6 md:gap-2">
            <Icon className="h-20 fill-live md:mr-12 md:h-36" />
            <Title as={'h3'} className="my-4 w-3/4 md:w-1/2">
              In Marburg ist es gerade{' '}
              <span className="whitespace-nowrap text-ecology">
                {conditionMapping[weather?.condition]}
              </span>
            </Title>
          </div>

          <Divider title="Wetterlage" />

          <div className="mb-4 flex flex-row items-start md:items-center">
            <div className="flex flex-1 flex-col gap-2">
              <Phenomenon
                phenomenon="temperature"
                size="xl"
                value={weather.temperature}
              />
              {currentPerceivedTemperature !== null && status === 'success' && (
                <Phenomenon
                  hide_icon={true}
                  phenomenon="perceived_temperature"
                  value={currentPerceivedTemperature}
                />
              )}
            </div>

            <div className="flex flex-1">
              <div className="flex h-full w-full flex-1 flex-col justify-between gap-2.5 md:gap-6">
                <Phenomenon
                  phenomenon="precipitation"
                  value={weather.precipitation}
                />
                <Phenomenon
                  phenomenon="cloudcover"
                  value={weather?.cloud_cover}
                />
                <Phenomenon
                  phenomenon="solar_radiation"
                  value={weather?.sunshine}
                />
              </div>
            </div>
          </div>

          <Divider title="Wind & Atmosphäre" />

          <div className="mb-4 flex flex-row items-start md:items-center gap-2.5 md:gap-6">
            <div className="w-32">
              <IconWeatherWindgeschw className="h-10 fill-live stroke-primary text-primary md:h-10" />
            </div>
            <div className="flex-1">
              <Phenomenon
                hide_icon={true}
                phenomenon="windspeed"
                value={weather?.wind_speed}
              />
            </div>
            <div className="flex-1">
              <Phenomenon
                hide_icon={true}
                meta={'(' + getWindDirection(weather?.wind_direction) + ')'}
                phenomenon="winddirection"
                value={weather?.wind_direction}
              />
            </div>
          </div>

          <div className="mb-4 flex flex-row items-start md:items-center gap-2.5 md:gap-6">
            <div className="w-32">
              <IconWeatherAtmosphaere className="h-10 fill-live stroke-primary text-primary md:h-20 md:pl-2" />
            </div>
            {weather?.relative_humidity && (
              <div className="flex-1">
                <Phenomenon
                  hide_icon={true}
                  phenomenon="humidity"
                  value={weather?.relative_humidity}
                />
              </div>
            )}

            <div className="flex-1">
              <Phenomenon
                hide_icon={true}
                phenomenon="pressure"
                value={weather?.pressure_msl}
              />
            </div>
          </div>
        </div>
      )}
      <Spacer />
      <Slider
        default_value={0}
        labels={(() => {
          const labels = nextHours.map(d => format(d, 'kk:mm'))
          labels[0] = 'jetzt'
          return labels
        })()}
        max={nextHours.length - 1}
        min={0}
        onValueChange={e => {
          setTimestamp(nextHours[e])
        }}
        variant={'ecology'}
      />
    </div>
  )
}
