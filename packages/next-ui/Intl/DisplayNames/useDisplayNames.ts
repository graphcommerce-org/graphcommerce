import { useMemo } from 'react'
import { useMemoObject } from '../../hooks/useMemoObject'
import { useLocalesArgument, UseLocalesArgumentOptions } from '../useLocalesArgument'

export type UseDisplayNamesOptions = Intl.DisplayNamesOptions & UseLocalesArgumentOptions

export function useDisplayNames(props: UseDisplayNamesOptions) {
  const [locales, options] = useLocalesArgument(props)
  const memoOptions = useMemoObject(options)
  return useMemo(() => new Intl.DisplayNames(locales, memoOptions), [locales, memoOptions])
}
