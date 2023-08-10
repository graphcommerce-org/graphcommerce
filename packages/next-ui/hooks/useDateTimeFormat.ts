import { useRouter } from 'next/router'
import { useMemo } from 'react'

export type DateTimeFormatProps = Intl.DateTimeFormatOptions

export function useDateTimeFormat(props?: DateTimeFormatProps) {
  const { locale } = useRouter()

  // Remove optional dialect from locale, which Intl.NumberFormat does not support.
  const strippedLocale = locale?.split('-', 2).join('-')

  const formatter = useMemo(
    () => new Intl.DateTimeFormat(strippedLocale, props),
    [strippedLocale, props],
  )
  return formatter
}
