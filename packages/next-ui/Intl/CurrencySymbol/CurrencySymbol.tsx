import { Box, type SxProps, type Theme } from '@mui/material'
import { forwardRef } from 'react'
import {
  useIntlNumberFormat,
  type UseIntlNumberFormatOptions,
} from '../NumberFormat/useIntlNumberFormat'

export type CurrencySymbolProps = Omit<UseIntlNumberFormatOptions, 'numberStyle'> & {
  sx?: SxProps<Theme>
}

/** @public */
export const CurrencySymbol = forwardRef<HTMLSpanElement, CurrencySymbolProps>((props, ref) => {
  const { sx, ...options } = props
  const formatter = useIntlNumberFormat({ ...options, numberStyle: 'currency' })

  return (
    <Box component='span' suppressHydrationWarning ref={ref} sx={sx}>
      {formatter.formatToParts(1).find((part) => part.type === 'currency')?.value}
    </Box>
  )
})
