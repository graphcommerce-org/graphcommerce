import { Box } from '@mui/material'
import { forwardRef } from 'react'
import {
  useIntlNumberFormat,
  type UseIntlNumberFormatOptions,
} from '../NumberFormat/useIntlNumberFormat'

export type CurrencySymbolProps = Omit<UseIntlNumberFormatOptions, 'numberStyle'>

/** @public */
export const CurrencySymbol = forwardRef<HTMLSpanElement, CurrencySymbolProps>((props, ref) => {
  const formatter = useIntlNumberFormat({ ...props, numberStyle: 'currency' })

  return (
    <Box component='span' suppressHydrationWarning ref={ref}>
      {formatter.formatToParts(1).find((part) => part.type === 'currency')?.value}
    </Box>
  )
})
