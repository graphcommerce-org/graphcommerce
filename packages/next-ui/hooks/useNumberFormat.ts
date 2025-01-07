import { useMemo } from 'react'
import { useLocale } from './useLocale'

/**
 * @deprecated Use <NumberFormat />, <PercentFormat /> or <UnitFormat /> or useIntlNumberFormat()
 *   instead
 * @public
 */
export function useNumberFormat(props?: Intl.NumberFormatOptions) {
  const locale = useLocale()
  const formatter = useMemo(() => new Intl.NumberFormat(locale, props), [locale, props])
  return formatter
}
