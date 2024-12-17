import { forwardRef } from 'react'
import { relativeTimeFormatUnitAuto } from './relativeTimeFormatAutoUnit'
import type { UseIntlRelativeTimeFormatOptions } from './useIntlRelativeTimeFormat'
import { useIntlRelativeTimeFormat } from './useIntlRelativeTimeFormat'

export type RelativeTimeFormatProps = {
  children: number
  unit?: Intl.RelativeTimeFormatUnit
} & UseIntlRelativeTimeFormatOptions

/**
 * Alternative: {@link file://./RelativeToTimeFormat.tsx}
 */
export const RelativeTimeFormat = forwardRef<HTMLSpanElement, RelativeTimeFormatProps>(
  (props, ref) => {
    const { children, unit, locale, localeMatcher, numeric, styleFormat, ...rest } = props
    const formatter = useIntlRelativeTimeFormat({ locale, localeMatcher, numeric, styleFormat })

    const [value, autoUnit] = relativeTimeFormatUnitAuto({ value: children, unit })

    return (
      <span suppressHydrationWarning ref={ref} {...rest}>
        {children ? formatter.format(value, autoUnit) : null}
      </span>
    )
  },
)
