import { useMemo } from 'react'
import { DateValue, toDate } from './toDate'
import { UseDateTimeFormatterOptions, useDateTimeFormatter } from './useDateTimeFormat'

export type DateTimeFormatProps = UseDateTimeFormatterOptions & { children: DateValue }

export function DateTimeFormat(props: DateTimeFormatProps) {
  const { children } = props
  const formatter = useDateTimeFormatter({ dateStyle: 'medium', timeStyle: 'short', ...props })

  const dateValue = useMemo(() => toDate(children), [children])
  return <span suppressHydrationWarning>{dateValue ? formatter.format(dateValue) : null}</span>
}
