import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import type { UseIntlLocalesArgumentOptions } from '../useIntlLocalesArgument'
import { useIntlLocalesArgument } from '../useIntlLocalesArgument'

export type UseIntlDateTimeFormatOptions = Intl.DateTimeFormatOptions &
  UseIntlLocalesArgumentOptions

export function useIntlDateTimeFormat(props: UseIntlDateTimeFormatOptions) {
  const [locales, options] = useIntlLocalesArgument(props)
  const memoOptions = useMemoObject(options)
  return useMemo(() => new Intl.DateTimeFormat(locales, memoOptions), [locales, memoOptions])
}
