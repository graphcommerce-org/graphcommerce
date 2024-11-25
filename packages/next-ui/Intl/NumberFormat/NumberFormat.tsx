import { Box } from '@mui/material'
import { forwardRef } from 'react'
import type { UseNumberFormatProps } from './useNumberFormat'
import { useNumberFormat } from './useNumberFormat'

export type NumberFormatValue = number | bigint | Intl.StringNumericLiteral

export type NumberFormatProps = UseNumberFormatProps & {
  value: NumberFormatValue
}

export const NumberFormat = forwardRef<HTMLSpanElement, NumberFormatProps>((props, ref) => {
  const { value, ...options } = props
  const formatter = useNumberFormat(options)

  return (
    <Box component='span' suppressHydrationWarning ref={ref}>
      {formatter.format(value)}
    </Box>
  )
})
