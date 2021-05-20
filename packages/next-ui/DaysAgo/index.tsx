type DaysAgoProps = {
  date: Date
}

export default function DaysAgo(props: DaysAgoProps) {
  const { date } = props
  const totalMsInDay = 1000 * 60 * 60 * 24

  const today = new Date()
  const timeDiff = today.getTime() - date.getTime()
  const days = Math.floor(timeDiff / totalMsInDay)

  return <span> {`${days} days ago`}</span>
}
