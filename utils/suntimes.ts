// utils/sunTimes.js

function toRadians(deg: number) {
  return (deg * Math.PI) / 180
}

function toDegrees(rad: number) {
  return (rad * 180) / Math.PI
}

export default function calculateSunTimes(
  lat: number,
  lng: number,
  date = new Date(),
) {
  const day = date.getUTCDate()
  const month = date.getUTCMonth() + 1
  const year = date.getUTCFullYear()

  const N1 = Math.floor((275 * month) / 9)
  const N2 = Math.floor((month + 9) / 12)
  const N3 = 1 + Math.floor((year - 4 * Math.floor(year / 4) + 2) / 3)
  const N = N1 - N2 * N3 + day - 30

  const lng_hour = lng / 15

  function compute(is_rise: boolean) {
    const t = N + ((is_rise ? 6 : 18) - lng_hour) / 24
    const M = 0.9856 * t - 3.289

    let L =
      M +
      1.916 * Math.sin(toRadians(M)) +
      0.02 * Math.sin(toRadians(2 * M)) +
      282.634
    L = (L + 360) % 360

    let RA = toDegrees(Math.atan(0.91764 * Math.tan(toRadians(L))))
    RA = (RA + 360) % 360

    const Lq = Math.floor(L / 90) * 90
    const RAq = Math.floor(RA / 90) * 90
    RA = RA + (Lq - RAq)
    RA /= 15

    const sin_dec = 0.39782 * Math.sin(toRadians(L))
    const cos_dec = Math.cos(Math.asin(sin_dec))
    const cos_h =
      (Math.cos(toRadians(90.833)) - sin_dec * Math.sin(toRadians(lat))) /
      (cos_dec * Math.cos(toRadians(lat)))

    if (cos_h > 1 || cos_h < -1) {
      return null
    }

    let H = is_rise
      ? 360 - toDegrees(Math.acos(cos_h))
      : toDegrees(Math.acos(cos_h))
    H /= 15

    const T = H + RA - 0.06571 * t - 6.622
    const UT = (T - lng_hour + 24) % 24

    const local = new Date(date)
    local.setUTCHours(Math.floor(UT))
    local.setUTCMinutes(Math.floor((UT % 1) * 60))

    return local
  }

  return { sunrise: compute(true), sunset: compute(false) }
}
