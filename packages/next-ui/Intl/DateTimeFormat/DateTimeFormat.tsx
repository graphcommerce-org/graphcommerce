import { useMemo } from 'react'
import type { DateValue } from './toDate'
import { toDate } from './toDate'
import type { UseDateTimeFormatterOptions } from './useDateTimeFormat'
import { useDateTimeFormatter } from './useDateTimeFormat'

export type DateTimeFormatProps = UseDateTimeFormatterOptions & { date: DateValue }

export function DateTimeFormat(props: DateTimeFormatProps) {
  const { date } = props
  const formatter = useDateTimeFormatter({ dateStyle: 'medium', timeStyle: 'short', ...props })

  const dateValue = useMemo(() => toDate(date), [date])
  return <span suppressHydrationWarning>{dateValue ? formatter.format(dateValue) : null}</span>
}
