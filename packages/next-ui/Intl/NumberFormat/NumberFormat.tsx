import { Box } from '@mui/material'
import { forwardRef } from 'react'
import type { UseIntlNumberFormatOptions } from './useIntlNumberFormat'
import { useIntlNumberFormat } from './useIntlNumberFormat'

export type NumberFormatValue = number | bigint | Intl.StringNumericLiteral

export type NumberFormatProps = UseIntlNumberFormatOptions & {
  value: NumberFormatValue
}

/** @public */
export const NumberFormat = forwardRef<HTMLSpanElement, NumberFormatProps>((props, ref) => {
  const { value, ...options } = props
  const formatter = useIntlNumberFormat(options)

  return (
    <Box component='span' suppressHydrationWarning ref={ref}>
      {formatter.format(value)}
    </Box>
  )
})
