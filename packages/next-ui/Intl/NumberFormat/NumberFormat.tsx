import { Box } from '@mui/material'
import { forwardRef } from 'react'
import type { UseNumberFormatProps } from './useNumberFormat'
import { useNumberFormat } from './useNumberFormat'

export type NumberFormatProps = UseNumberFormatProps & {
  children: number | bigint | Intl.StringNumericLiteral
}

export const NumberFormat = forwardRef<HTMLSpanElement, NumberFormatProps>((props, ref) => {
  const { children, ...options } = props
  const formatter = useNumberFormat(options)

  return (
    <Box component='span' suppressHydrationWarning ref={ref}>
      {children ? formatter.format(children) : null}
    </Box>
  )
})
