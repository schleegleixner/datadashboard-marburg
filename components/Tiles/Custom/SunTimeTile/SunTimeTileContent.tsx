'use client'

import { useEffect, useState } from 'react'
import calculateSunTimes from '@/utils/suntimes'
import RequestIndicator from '@/components/Elements/RequestIndicator'
import Text from '@/components/Elements/Text'
import { formatTimeToGerman, humanizedTime } from '@/utils/date'
import { IconWeatherSonnigFilled as Icon } from '@/components/Icons/Weather'
import { CITY_COORDINATES } from '@/lib/constants'

type SunData = { sunrise: Date; sunset: Date } | null

export default function SunriseSunsetContent() {
  const [sun_data, set_sun_data] = useState<SunData>(null)
  const [light_percent, setLightPercent] = useState<number | null>(null)
  const [now, set_now] = useState(new Date())
  const [before_sunrise, setBeforeSunrise] = useState(false)
  const [after_sunset, setAfterSunset] = useState(false)
  const [passed_ms, setPassedMs] = useState(0)
  const [remaining_ms, setRemainingMs] = useState(0)
  const [light_ms, setLightMs] = useState(0)
  const [to_sunrise_ms, setToSunriseMs] = useState(0)
  const [since_sunset_ms, setSinceSunsetMs] = useState(0)

  // update all calculations
  function updateCalc() {
    if (!sun_data?.sunrise || !sun_data?.sunset) {
      return
    }

    // get times in ms
    const now_time = now.getTime()

    const sunrise_time = sun_data.sunrise.getTime()
    const sunset_time = sun_data.sunset.getTime()

    const light_ms = sunset_time - sunrise_time
    const passed_ms = now_time - sunrise_time

    setLightMs(light_ms)
    setPassedMs(passed_ms)
    setRemainingMs(sunset_time - now_time)
    setToSunriseMs(sunrise_time - now_time)
    setSinceSunsetMs(now_time - sunset_time)

    const percent =
      passed_ms <= 0
        ? 0
        : passed_ms >= light_ms
          ? 100
          : (passed_ms / light_ms) * 100

    setLightPercent(percent)

    // before sunrise or after sunset
    const before_midnight = now.getHours() < 12
    const before_sunrise = now_time < sunrise_time && before_midnight
    const after_sunset = now_time > sunset_time && !before_midnight

    setBeforeSunrise(before_sunrise)
    setAfterSunset(after_sunset)
  }

  // get sun times at mount and every midnight
  useEffect(() => {
    function updateSunTimes() {
      const { sunrise, sunset } = calculateSunTimes(
        CITY_COORDINATES.lat,
        CITY_COORDINATES.lng,
      )
      if (sunrise && sunset) {
        set_sun_data({ sunrise, sunset })
      }
    }

    function scheduleNextMidnight() {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setHours(24, 0, 0, 0)

      const ms_until_midnight = tomorrow.getTime() - now.getTime()

      return setTimeout(() => {
        updateSunTimes()
        scheduleNextMidnight()
      }, ms_until_midnight)
    }

    updateSunTimes()
    const timeout_id = scheduleNextMidnight()

    return () => clearTimeout(timeout_id)
  }, [])

  // recalc light percent when sun data or now changes
  useEffect(() => {
    if (!sun_data) {
      return
    }
    updateCalc()
  }, [sun_data, now])

  // update "now" every minute
  useEffect(() => {
    if (!sun_data) {
      return
    }

    const interval = setInterval(() => {
      set_now(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [sun_data])

  if (!sun_data) {
    return <RequestIndicator />
  }

  return (
    <div className="flex flex-col gap-8 space-y-2">
      <div className="flex w-full flex-row justify-between gap-8">
        <div className="flex flex-col items-center gap-2">
          <Text>Sonnenaufgang</Text>
          <Text as="h3" font="bold" variant="ecology">
            {formatTimeToGerman(sun_data.sunrise)}
          </Text>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Text>Sonnenuntergang</Text>
          <Text as="h3" font="bold" variant="ecology">
            {formatTimeToGerman(sun_data.sunset)}
          </Text>
        </div>
      </div>

      <div className="relative">
        <div className="h-6 w-full rounded-full bg-gradient-to-r from-indigo-800 via-amber-200 to-indigo-800"></div>
        {!before_sunrise && !after_sunset && light_percent !== null && (
          <div
            className="absolute top-0 -ml-8 -mt-5 h-16 w-16 origin-center"
            style={{
              left: `${light_percent}%`,
              scale: `${(-0.00035 * Math.pow(light_percent - 50, 2) + 1.5).toFixed(3)}`,
            }}
          >
            {/* Ein Diagramm, das die Skalierung des Icons zeigt  */}
            <Icon className="h-full w-full fill-orange-300" />
          </div>
        )}
      </div>

      <div className="flex flex-col gap-4">
        <Text>
          {before_sunrise && (
            <>
              Die Sonne geht in{' '}
              <span className="whitespace-nowrap font-bold">
                {humanizedTime(to_sunrise_ms)}
              </span>{' '}
              auf.
            </>
          )}

          {after_sunset && (
            <>
              Die Sonne ist vor{' '}
              <span className="whitespace-nowrap font-bold">
                {humanizedTime(since_sunset_ms)}
              </span>{' '}
              untergegangen.
            </>
          )}

          {!before_sunrise && !after_sunset && (
            <>
              Die Sonne ist vor{' '}
              <span className="whitespace-nowrap font-bold">
                {humanizedTime(passed_ms)}
              </span>{' '}
              aufgegangen. Noch{' '}
              <span className="whitespace-nowrap font-bold">
                {humanizedTime(remaining_ms)}
              </span>{' '}
              bis zum Sonnenuntergang.
            </>
          )}
        </Text>
        <Text>
          {after_sunset ? (
            <>
              Der Tage heute hat{' '}
              <span className="whitespace-nowrap font-bold">
                {humanizedTime(light_ms)}
              </span>{' '}
              Tageslicht geboten.
            </>
          ) : (
            <>
              Der Tag heute bietet{' '}
              <span className="whitespace-nowrap font-bold">
                {humanizedTime(light_ms)}
              </span>{' '}
              Tageslicht.
            </>
          )}
        </Text>
      </div>
    </div>
  )
}
