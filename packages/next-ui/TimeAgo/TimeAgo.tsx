export type TimeAgoProps = {
  date: Date
  locale?: string
}

export function TimeAgo(props: TimeAgoProps) {
  const { date, locale = 'en' } = props
  const msPerMinute = 60 * 1000
  const msPerHour = msPerMinute * 60
  const msPerDay = msPerHour * 24

  const timestamp = date.getTime()
  const elapsed = Date.now() - timestamp
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (elapsed < msPerMinute) {
    return <span>{rtf.format(-Math.floor(elapsed / 1000), 'seconds')}</span>
  }

  if (elapsed < msPerHour) {
    return <span>{rtf.format(-Math.floor(elapsed / msPerMinute), 'minutes')}</span>
  }

  if (elapsed < msPerDay) {
    return <span>{rtf.format(-Math.floor(elapsed / msPerHour), 'hours')}</span>
  }

  return <span>{rtf.format(-Math.round(elapsed / msPerDay), 'days')}</span>
}
