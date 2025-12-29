import { Box } from '@mui/material'
import type { BoxProps } from '@mui/material'
import { forwardRef } from 'react'
import { relativeTimeFormatUnitAuto } from './relativeTimeFormatAutoUnit'
import type { UseIntlRelativeTimeFormatOptions } from './useIntlRelativeTimeFormat'
import { useIntlRelativeTimeFormat } from './useIntlRelativeTimeFormat'

export type RelativeTimeFormatProps = {
  /** Value to format. */
  value: number
  /**
   * Unit to display. If no unit is given the unit is automatically determined and the value given
   * is measured in seconds.
   */
  unit?: Intl.RelativeTimeFormatUnit
} & UseIntlRelativeTimeFormatOptions &
  Omit<BoxProps<'span'>, 'children'>

/**
 * Function to format a relative time. Implementation of
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/RelativeTimeFormat}
 *
 * When no unit is given it tries to automatically determine the unit and expects the value to be in
 * seconds.
 *
 * @public
 * @see {@link file://./RelativeToTimeFormat.tsx}
 */
export const RelativeTimeFormat = forwardRef<HTMLSpanElement, RelativeTimeFormatProps>(
  (props, ref) => {
    const { value, unit, locale, localeMatcher, numeric, styleFormat, ...rest } = props
    const formatter = useIntlRelativeTimeFormat({ locale, localeMatcher, numeric, styleFormat })

    const result = relativeTimeFormatUnitAuto({ value, unit })

    return (
      <Box
        component='span'
        className='RelativeTimeFormat'
        suppressHydrationWarning
        ref={ref}
        {...rest}
      >
        {result.value &&
          formatter.formatToParts(result.value, result.unit).map((part) => (
            <span className={part.type} key={part.type} suppressHydrationWarning>
              {part.value}
            </span>
          ))}
      </Box>
    )
  },
)
