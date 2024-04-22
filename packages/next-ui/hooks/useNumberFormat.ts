import { useMemo } from 'react'
import { useLocale } from './useLocale'

export type NumberFormatProps = Intl.NumberFormatOptions

export function useNumberFormat(props?: NumberFormatProps) {
  const locale = useLocale()
  const formatter = useMemo(() => new Intl.NumberFormat(locale, props), [locale, props])
  return formatter
}
