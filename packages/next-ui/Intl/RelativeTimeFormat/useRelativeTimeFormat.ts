import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import { useLocalesArgument, UseLocalesArgumentOptions } from '../useLocalesArgument'

export type UseRelativeTimeFormatterProps = {
  styleFormat?: Intl.RelativeTimeFormatStyle
} & Omit<Intl.RelativeTimeFormatOptions, 'style'> &
  UseLocalesArgumentOptions

export function useRelativeTimeFormat(props: UseRelativeTimeFormatterProps) {
  const [locales, { styleFormat, ...options }] = useLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options, style: styleFormat })
  return useMemo(() => new Intl.RelativeTimeFormat(locales, memoOptions), [locales, memoOptions])
}
