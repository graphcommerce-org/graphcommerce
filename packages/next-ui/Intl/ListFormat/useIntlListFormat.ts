import { useMemo } from 'react'
import { useMemoObject } from '../../hooks'
import type { UseIntlLocalesArgumentOptions } from '../useIntlLocalesArgument'
import { useIntlLocalesArgument } from '../useIntlLocalesArgument'

export type UseIntlListFormatOptions = {
  listStyle?: Intl.ListFormatOptions['style']
} & Omit<Intl.ListFormatOptions, 'style'> &
  UseIntlLocalesArgumentOptions

export function useIntlListFormat(props: UseIntlListFormatOptions) {
  const [locales, options] = useIntlLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options })
  return useMemo(() => new Intl.ListFormat(locales, memoOptions), [locales, memoOptions])
}
