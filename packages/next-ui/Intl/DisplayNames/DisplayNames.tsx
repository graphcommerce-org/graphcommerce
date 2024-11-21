import type { UseDisplayNamesOptions } from './useDisplayNames'
import { useDisplayNames } from './useDisplayNames'

type DisplayNamesProps = UseDisplayNamesOptions & {
  code: string
}

export function DisplayNames(props: DisplayNamesProps) {
  const { code, ...options } = props
  const formatter = useDisplayNames(options)

  return <span suppressHydrationWarning>{formatter.of(code)}</span>
}
