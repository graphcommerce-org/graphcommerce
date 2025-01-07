import { useMemo } from 'react'
import type { DateValue } from './toDate'
import { toDate } from './toDate'
import type { UseIntlDateTimeFormatOptions } from './useIntlDateTimeFormat'
import { useIntlDateTimeFormat } from './useIntlDateTimeFormat'

export type DateTimeFormatProps = UseIntlDateTimeFormatOptions & { date: DateValue }

/** @public */
export function DateTimeFormat(props: DateTimeFormatProps) {
  const { date } = props
  const formatter = useIntlDateTimeFormat({ dateStyle: 'medium', timeStyle: 'short', ...props })

  const dateValue = useMemo(() => toDate(date), [date])
  return <span suppressHydrationWarning>{dateValue ? formatter.format(dateValue) : null}</span>
}
