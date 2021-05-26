type DaysAgoProps = {
  date: Date
  locale?: string
}

export default function DaysAgo(props: DaysAgoProps) {
  const { date, locale = 'en' } = props
  const msInDay = 1000 * 60 * 60 * 24
  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })
  const today = new Date()
  const timeDiff = date.getTime() - today.getTime()

  return <span>{rtf.format(Math.round(timeDiff / msInDay), 'days')}</span>
}
