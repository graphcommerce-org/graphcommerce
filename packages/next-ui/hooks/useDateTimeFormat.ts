import { normalizeLocale } from '@graphcommerce/lingui-next'
import { useMemo } from 'react'
import { useStorefrontConfig } from './useStorefrontConfig'
import { useLocale } from '@graphcommerce/next-ui'

export type DateTimeFormatProps = Intl.DateTimeFormatOptions

export function useDateTimeFormat(props?: DateTimeFormatProps) {
  const locale = useLocale()

  const formatter = useMemo(() => new Intl.DateTimeFormat(locale, props), [locale, props])
  return formatter
}
