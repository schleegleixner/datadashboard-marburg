export function formatTimeToGerman(date: Date | undefined, label: string = 'Uhr') {
  const hours = date ? String(date.getHours()).padStart(2, '0') : '--'
  const minutes = date ? String(date.getMinutes()).padStart(2, '0') : '--'
  return `${hours}:${minutes} ${label}`
}

export function humanizedTime(ms: number): string {
  const total_minutes = Math.floor(ms / 60000)
  const hours = Math.floor(total_minutes / 60)
  const minutes = total_minutes % 60

  const minutes_label = `Minute${minutes === 1 ? '' : 'n'}`
  const hour_label = `Stunde${hours === 1 ? '' : 'n'}`

  if (hours === 0) {
    return `${minutes} ${minutes_label}`
  }

  return (
    `${hours}:${String(minutes).padStart(2, '0')} ${hour_label}`
  )
}
