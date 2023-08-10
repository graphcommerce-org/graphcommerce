import { useRouter } from 'next/router'
import { useMemo } from 'react'

export type NumberFormatProps = Intl.NumberFormatOptions

export function useNumberFormat(props?: NumberFormatProps) {
  const { locale } = useRouter()

  // Remove optional dialect from locale, which Intl.NumberFormat does not support.
  const strippedLocale = locale?.split('-', 2).join('-')

  const formatter = useMemo(
    () => new Intl.NumberFormat(strippedLocale, props),
    [strippedLocale, props],
  )
  return formatter
}
