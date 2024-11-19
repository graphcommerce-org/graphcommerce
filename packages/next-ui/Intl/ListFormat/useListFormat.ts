import { useMemo } from 'react'
import { useMemoObject } from '../../hooks'
import { useLocalesArgument, UseLocalesArgumentOptions } from '../useLocalesArgument'

export type UseListFormatterOptions = {
  listStyle?: Intl.ListFormatOptions['style']
} & Omit<Intl.ListFormatOptions, 'style'> &
  UseLocalesArgumentOptions

export function useListFormat(props: UseListFormatterOptions) {
  const [locales, options] = useLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options })
  return useMemo(() => new Intl.ListFormat(locales, memoOptions), [locales, memoOptions])
}
