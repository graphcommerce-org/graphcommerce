import { forwardRef } from 'react'
import { relativeTimeFormatUnitAuto } from './relativeTimeFormatAutoUnit'
import type { UseRelativeTimeFormatterProps } from './useRelativeTimeFormat'
import { useRelativeTimeFormat } from './useRelativeTimeFormat'

export type RelativeTimeFormatProps = {
  children: number
  unit?: Intl.RelativeTimeFormatUnit
} & UseRelativeTimeFormatterProps

/**
 * Alternative: {@link file://./RelativeToTimeFormat.tsx}
 */
export const RelativeTimeFormat = forwardRef<HTMLSpanElement, RelativeTimeFormatProps>(
  (props, ref) => {
    const { children, unit, locale, localeMatcher, numeric, styleFormat, ...rest } = props
    const formatter = useRelativeTimeFormat({ locale, localeMatcher, numeric, styleFormat })

    const [value, autoUnit] = relativeTimeFormatUnitAuto({ value: children, unit })

    return (
      <span suppressHydrationWarning ref={ref} {...rest}>
        {children ? formatter.format(value, autoUnit) : null}
      </span>
    )
  },
)
