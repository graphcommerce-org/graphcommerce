import { useMemo } from 'react'
import { useLocale } from '../../hooks/useLocale'
import { useMemoObject } from '../../hooks/useMemoObject'

export type UseDisplayNamesProps = Intl.DisplayNamesOptions

export function useDisplayNames(props: UseDisplayNamesProps) {
  const locale = useLocale()
  const memoOptions = useMemoObject(props)
  return useMemo(() => new Intl.DisplayNames(locale, memoOptions), [locale, memoOptions])
}

type DisplayNamesProps = UseDisplayNamesProps & {
  code: string
}

export function DisplayNames(props: DisplayNamesProps) {
  const { code, ...options } = props
  const formatter = useDisplayNames(options)

  return <span suppressHydrationWarning>{formatter.of(code)}</span>
}
