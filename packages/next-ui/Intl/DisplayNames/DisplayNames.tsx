import type { UseIntlDisplayNamesOptions } from './useIntlDisplayNames'
import { useIntlDisplayNames } from './useIntlDisplayNames'

export type DisplayNamesProps = UseIntlDisplayNamesOptions & {
  code: string
}

/** @public */
export function DisplayNames(props: DisplayNamesProps) {
  const { code, ...options } = props
  const formatter = useIntlDisplayNames(options)

  return <span suppressHydrationWarning>{formatter.of(code)}</span>
}
