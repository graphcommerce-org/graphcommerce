import { Box, type SxProps, type Theme } from '@mui/material'
import { forwardRef } from 'react'
import type { UseIntlNumberFormatOptions } from './useIntlNumberFormat'
import { useIntlNumberFormat } from './useIntlNumberFormat'

export type NumberFormatValue = number | bigint | Intl.StringNumericLiteral

export type NumberFormatProps = UseIntlNumberFormatOptions & {
  value: NumberFormatValue
  sx?: SxProps<Theme>
}

/** @public */
export const NumberFormat = forwardRef<HTMLSpanElement, NumberFormatProps>((props, ref) => {
  const { value, sx, ...options } = props
  const formatter = useIntlNumberFormat(options)

  return (
    <Box component='span' className='NumberFormat' suppressHydrationWarning ref={ref} sx={sx}>
      {formatter.formatToParts(value).map((part) => (
        <span className={part.type} key={part.type} suppressHydrationWarning>
          {part.value}
        </span>
      ))}
    </Box>
  )
})
