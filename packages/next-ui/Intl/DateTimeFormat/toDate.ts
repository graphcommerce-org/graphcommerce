export type DateValue = Date | string | number | null | undefined

export function toDate(value: DateValue): Date | undefined {
  let date: Date | undefined

  if (value instanceof Date) {
    date = value
  } else if (typeof value === 'string') {
    date = new Date(value.replace(/-/g, '/'))
  } else if (typeof value === 'number') {
    date = new Date(value)
  }

  if (date && Number.isNaN(date.getTime())) return undefined
  return date
}
