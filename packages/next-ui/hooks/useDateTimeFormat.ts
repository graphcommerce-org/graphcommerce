import { useMemo } from 'react'
import { useLocale } from './useLocale'

/**
 * @deprecated Use <DateFormat/>, <TimeFormat/> or <DateTimeFormat/> or useIntlDateTimeFormat()
 *   instead
 * @public
 */
export function useDateTimeFormat(props?: Intl.DateTimeFormatOptions) {
  const locale = useLocale()
  const formatter = useMemo(() => new Intl.DateTimeFormat(locale, props), [locale, props])
  return formatter
}
