import { renderToStaticMarkup } from 'react-dom/server'

export const convertToFloat = (str: string): number =>
  parseFloat(str.replace(/\./g, '').replace(',', '.'))

export const convertToUnixTimestamp = (dateStr: string | undefined): number => {
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mär: 2,
    Apr: 3,
    Mai: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Okt: 9,
    Nov: 10,
    Dez: 11,
  }

  if (!dateStr) {
    // handle undefined or empty dateStr gracefully
    return NaN
  }

  if (/^\d{4}$/.test(dateStr)) {
    // check if the dateStr is just a year
    const date = new Date(`${dateStr}-01-01T00:00:00Z`)
    return Math.floor(date.getTime() / 1000)
  }

  const [monthStr, yearStr] = dateStr.split(' ')
  const month = monthMap[monthStr]
  const year = parseInt(`20${yearStr}`, 10) // Assumes the year is in the 21st century
  const date = new Date(year, month, 1) // Month in Date object is 0-based
  return Math.floor(date.getTime() / 1000)
}

export function getSaveId(id: string): string {
  return id
    .toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}

export function numberFormat(
  value: number,
  digits: number = 0,
  locale: string = 'de-DE',
): string {
  return value.toLocaleString(locale, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  })
}

export function getStaticIcon(icon: React.ReactElement, color: string): string {
  const svg_raw = renderToStaticMarkup(icon)

  if (!svg_raw) {
    return ''
  }

  const colored_svg = svg_raw
    .replace(/fill="[^"]*"/gi, `fill="${color}"`)
    .replace(/stroke="[^"]*"/gi, `stroke="${color}"`)
    .replace(
      /class="[^"]*fill-[^"]*"/gi,
      `fill="${color}" class="fill-inherit"`,
    )
    .replace(
      /class="[^"]*stroke-[^"]*"/gi,
      `stroke="${color}" class="stroke-inherit"`,
    )

  return colored_svg
}