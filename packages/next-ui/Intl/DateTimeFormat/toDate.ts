export type DateValue = Date | string | number | null | undefined

const DATE_ONLY_RE = /^(\d{4})-(\d{2})-(\d{2})$/
const DMY_RE = /^(\d{1,2})\/(\d{1,2})\/(\d{4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/

/**
 * Builds a Date from numeric components and verifies it round-trips. JS silently normalizes
 * overflow (Feb 31 -> Mar 3), so this is the only reliable way to reject nonsense input like
 * "31/02/2026" or "99/99/2026".
 */
function fromComponents(
  y: number,
  m: number, // 1-indexed
  d: number,
  h = 0,
  min = 0,
  s = 0,
): Date | undefined {
  const date = new Date(y, m - 1, d, h, min, s)
  const valid =
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d &&
    date.getHours() === h &&
    date.getMinutes() === min &&
    date.getSeconds() === s
  return valid ? date : undefined
}

export function toDate(value: DateValue): Date | undefined {
  let date: Date | undefined

  if (value instanceof Date) {
    date = value
  } else if (typeof value === 'string') {
    const dmy = value.match(DMY_RE)
    const ymd = value.match(DATE_ONLY_RE)

    if (dmy) {
      const [, d, m, y, h = '0', min = '0', s = '0'] = dmy
      date = fromComponents(Number(y), Number(m), Number(d), Number(h), Number(min), Number(s))
    } else if (ymd) {
      const [, y, m, d] = ymd
      date = fromComponents(Number(y), Number(m), Number(d))
    } else {
      date = new Date(value)
    }
  } else if (typeof value === 'number') {
    date = new Date(value)
  }

  if (date && Number.isNaN(date.getTime())) return undefined
  return date
}
