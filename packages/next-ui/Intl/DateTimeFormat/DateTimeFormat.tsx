import { useMemo } from 'react'
import { useLocale } from '../../hooks/useLocale'
import { useMemoObject } from '../../hooks/useMemoObject'
import { DateValue, toDate } from './toDate'

export function useDateTimeFormatter(props: Intl.DateTimeFormatOptions) {
  const locale = useLocale()
  const memoOptions = useMemoObject(props)
  return useMemo(() => new Intl.DateTimeFormat(locale, memoOptions), [locale, memoOptions])
}

export type DateTimeFormatPropsType = { children: DateValue } & Intl.DateTimeFormatOptions

export function DateTimeFormat(props: DateTimeFormatPropsType) {
  const { children } = props
  const formatter = useDateTimeFormatter({ dateStyle: 'medium', timeStyle: 'short', ...props })

  const dateValue = useMemo(() => toDate(children), [children])
  return <span suppressHydrationWarning>{children ? formatter.format(dateValue) : null}</span>
}
