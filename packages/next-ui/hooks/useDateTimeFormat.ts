import { useMemo } from 'react'
import { useLocale } from './useLocale'

/**
 * @deprecated use <DateFormat/>, <TimeFormat/> or <DateTimeFormat/> instead
 */
export function useDateTimeFormat(props?: Intl.DateTimeFormatOptions) {
  const locale = useLocale()
  const formatter = useMemo(() => new Intl.DateTimeFormat(locale, props), [locale, props])
  return formatter
}
