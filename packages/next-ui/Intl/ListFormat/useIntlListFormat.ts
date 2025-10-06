import { useMemo } from 'react'
import { useMemoObject } from '../../hooks'
import type { UseIntlLocalesArgumentOptions } from '../useIntlLocalesArgument'
import { useIntlLocalesArgument } from '../useIntlLocalesArgument'

export type UseIntlListFormatOptions = {
  listStyle?: Intl.ListFormatOptions['style']
} & Omit<Intl.ListFormatOptions, 'style'> &
  UseIntlLocalesArgumentOptions

export function useIntlListFormat(props: UseIntlListFormatOptions) {
  const [locales, { listStyle: style, ...options }] = useIntlLocalesArgument(props)
  const memoOptions = useMemoObject({ style, ...options })
  return useMemo(() => new Intl.ListFormat(locales, memoOptions), [locales, memoOptions])
}
