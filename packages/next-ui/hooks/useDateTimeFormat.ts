import { useRouter } from 'next/compat/router'
import { useMemo } from 'react'

export type DateTimeFormatProps = Intl.DateTimeFormatOptions

export function useDateTimeFormat(props?: DateTimeFormatProps) {
  const { locale } = useRouter()
  const formatter = useMemo(() => new Intl.DateTimeFormat(locale, props), [locale, props])
  return formatter
}
