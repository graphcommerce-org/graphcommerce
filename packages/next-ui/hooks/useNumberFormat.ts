import { useRouter } from 'next/compat/router'
import { useMemo } from 'react'

export type NumberFormatProps = Intl.NumberFormatOptions

export function useNumberFormat(props?: NumberFormatProps) {
  const locale = useRouter()?.locale
  const formatter = useMemo(() => new Intl.NumberFormat(locale, props), [locale, props])
  return formatter
}
