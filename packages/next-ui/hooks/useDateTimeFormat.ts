import { normalizeLocale } from '@graphcommerce/lingui-next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

export type DateTimeFormatProps = Intl.DateTimeFormatOptions

export function useDateTimeFormat(props?: DateTimeFormatProps) {
  const { locale } = useRouter()

  const formatter = useMemo(
    () => new Intl.DateTimeFormat(normalizeLocale(locale), props),
    [locale, props],
  )
  return formatter
}
