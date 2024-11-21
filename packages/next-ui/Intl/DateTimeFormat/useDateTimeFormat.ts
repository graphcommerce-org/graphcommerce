import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import type { UseLocalesArgumentOptions } from '../useLocalesArgument'
import { useLocalesArgument } from '../useLocalesArgument'

export type UseDateTimeFormatterOptions = Intl.DateTimeFormatOptions & UseLocalesArgumentOptions

export function useDateTimeFormatter(props: UseDateTimeFormatterOptions) {
  const [locales, options] = useLocalesArgument(props)
  const memoOptions = useMemoObject(options)
  return useMemo(() => new Intl.DateTimeFormat(locales, memoOptions), [locales, memoOptions])
}
