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

  const dateObj = useMemo(() => {
    if (!children) return null
    if (typeof children === 'string') {
      return new Date(children.replace(/-/g, '/'))
    }
    return children instanceof Date ? children : new Date(children)
  }, [children])

  if (!dateObj || isNaN(dateObj.getTime())) return null

  return <span suppressHydrationWarning>{formatter.format(dateObj)}</span>
}
