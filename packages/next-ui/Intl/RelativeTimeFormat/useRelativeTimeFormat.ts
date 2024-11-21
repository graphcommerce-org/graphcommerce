import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import type { UseLocalesArgumentOptions } from '../useLocalesArgument'
import { useLocalesArgument } from '../useLocalesArgument'

export type UseRelativeTimeFormatterProps = {
  styleFormat?: Intl.RelativeTimeFormatStyle
} & Omit<Intl.RelativeTimeFormatOptions, 'style'> &
  UseLocalesArgumentOptions

export function useRelativeTimeFormat(props: UseRelativeTimeFormatterProps) {
  const [locales, { styleFormat, ...options }] = useLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options, style: styleFormat })
  return useMemo(() => new Intl.RelativeTimeFormat(locales, memoOptions), [locales, memoOptions])
}
