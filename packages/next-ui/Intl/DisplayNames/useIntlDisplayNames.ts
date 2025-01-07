import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import type { UseIntlLocalesArgumentOptions } from '../useIntlLocalesArgument'
import { useIntlLocalesArgument } from '../useIntlLocalesArgument'

export type UseIntlDisplayNamesOptions = Intl.DisplayNamesOptions & UseIntlLocalesArgumentOptions

export function useIntlDisplayNames(props: UseIntlDisplayNamesOptions) {
  const [locales, options] = useIntlLocalesArgument(props)
  const memoOptions = useMemoObject(options)
  return useMemo(() => new Intl.DisplayNames(locales, memoOptions), [locales, memoOptions])
}
