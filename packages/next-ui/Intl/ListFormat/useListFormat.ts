import { useMemo } from 'react'
import { useMemoObject } from '../../hooks'
import type { UseLocalesArgumentOptions } from '../useLocalesArgument'
import { useLocalesArgument } from '../useLocalesArgument'

export type UseListFormatOptions = {
  listStyle?: Intl.ListFormatOptions['style']
} & Omit<Intl.ListFormatOptions, 'style'> &
  UseLocalesArgumentOptions

export function useListFormat(props: UseListFormatOptions) {
  const [locales, options] = useLocalesArgument(props)
  const memoOptions = useMemoObject({ ...options })
  return useMemo(() => new Intl.ListFormat(locales, memoOptions), [locales, memoOptions])
}
