import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import type { UseIntlLocalesArgumentOptions } from '../useIntlLocalesArgument'
import { useIntlLocalesArgument } from '../useIntlLocalesArgument'

export type UseIntlRelativeTimeFormatOptions = {
  styleFormat?: Intl.RelativeTimeFormatStyle
} & Omit<Intl.RelativeTimeFormatOptions, 'style'> &
  UseIntlLocalesArgumentOptions

export function useIntlRelativeTimeFormat(props: UseIntlRelativeTimeFormatOptions) {
  const [locales, { styleFormat, ...options }] = useIntlLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options, style: styleFormat })
  return useMemo(() => new Intl.RelativeTimeFormat(locales, memoOptions), [locales, memoOptions])
}
