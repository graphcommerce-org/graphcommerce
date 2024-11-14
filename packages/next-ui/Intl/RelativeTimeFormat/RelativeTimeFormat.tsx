import { forwardRef, useMemo } from 'react'
import { useLocale } from '../../hooks/useLocale'
import { useMemoObject } from '../../hooks/useMemoObject'
import { relativeTimeFormatUnitAuto } from './relativeTimeFormatAutoUnit'

export function useRelativeTimeFormatter(props: Intl.RelativeTimeFormatOptions) {
  const locale = useLocale()
  const memoOptions = useMemoObject(props)
  return useMemo(() => new Intl.RelativeTimeFormat(locale, memoOptions), [locale, memoOptions])
}

export type RelativeTimeFormatProps = {
  children: number
  unit?: Intl.RelativeTimeFormatUnit
  styleFormat?: Intl.RelativeTimeFormatStyle
} & Omit<Intl.RelativeTimeFormatOptions, 'style'>

/**
 * Alternative: {@link file://./RelativeToTimeFormat.tsx}
 */
export const RelativeTimeFormat = forwardRef<HTMLSpanElement, RelativeTimeFormatProps>(
  (props, ref) => {
    const { children, unit, styleFormat, localeMatcher, numeric, ...rest } = props
    const formatter = useRelativeTimeFormatter({ localeMatcher, numeric, style: styleFormat })

    const [value, autoUnit] = relativeTimeFormatUnitAuto({ value: children, unit })

    return (
      <span suppressHydrationWarning ref={ref} {...rest}>
        {children ? formatter.format(value, autoUnit) : null}
      </span>
    )
  },
)
