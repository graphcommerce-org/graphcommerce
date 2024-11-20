import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import type { UseLocalesArgumentOptions } from '../useLocalesArgument'
import { useLocalesArgument } from '../useLocalesArgument'

export type UseDisplayNamesOptions = Intl.DisplayNamesOptions & UseLocalesArgumentOptions

export function useDisplayNames(props: UseDisplayNamesOptions) {
  const [locales, options] = useLocalesArgument(props)
  const memoOptions = useMemoObject(options)
  return useMemo(() => new Intl.DisplayNames(locales, memoOptions), [locales, memoOptions])
}
