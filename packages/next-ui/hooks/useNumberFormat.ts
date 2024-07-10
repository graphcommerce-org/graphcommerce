import { useMemo } from 'react'
import { useLocale } from './useLocale'

/**
 * @deprecated use <NumberFormat />, <PercentFormat /> or <UnitFormat /> instead
 */
export function useNumberFormat(props?: Intl.NumberFormatOptions) {
  const locale = useLocale()
  const formatter = useMemo(() => new Intl.NumberFormat(locale, props), [locale, props])
  return formatter
}
