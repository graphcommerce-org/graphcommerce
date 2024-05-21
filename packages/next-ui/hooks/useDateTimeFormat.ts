import { useMemo } from 'react'
import { useLocale } from './useLocale'

export type DateTimeFormatProps = Intl.DateTimeFormatOptions

export function useDateTimeFormat(props?: DateTimeFormatProps) {
  const locale = useLocale()

  const formatter = useMemo(() => new Intl.DateTimeFormat(locale, props), [locale, props])
  return formatter
}
