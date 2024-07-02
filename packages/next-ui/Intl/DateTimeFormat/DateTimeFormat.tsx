import { useMemo } from 'react'
import { useLocale } from '../../hooks/useLocale'
import { useMemoObject } from '../../hooks/useMemoObject'

export function useDateTimeFormatter(props: Intl.DateTimeFormatOptions) {
  const locale = useLocale()
  const memoOptions = useMemoObject(props)
  return useMemo(() => new Intl.DateTimeFormat(locale, memoOptions), [locale, memoOptions])
}

type DateValue = Date | string | number | null | undefined
export type DateTimeFormatPropsType = { children: DateValue } & Intl.DateTimeFormatOptions

export function DateTimeFormat(props: DateTimeFormatPropsType) {
  const { children } = props
  const formatter = useDateTimeFormatter({ dateStyle: 'medium', timeStyle: 'short', ...props })

  return (
    <span suppressHydrationWarning>
      {children
        ? formatter.format(typeof children === 'string' ? new Date(children) : children)
        : null}
    </span>
  )
}
