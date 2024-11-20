import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import { useLocalesArgument, UseLocalesArgumentOptions } from '../useLocalesArgument'

export type UseDateTimeFormatterOptions = Intl.DateTimeFormatOptions & UseLocalesArgumentOptions

export function useDateTimeFormatter(props: UseDateTimeFormatterOptions) {
  const [locales, options] = useLocalesArgument(props)
  const memoOptions = useMemoObject(options)
  return useMemo(() => new Intl.DateTimeFormat(locales, memoOptions), [locales, memoOptions])
}
