import { Box, type SxProps, type Theme } from '@mui/material'
import { forwardRef } from 'react'
import { DisplayNames } from '../DisplayNames'
import {
  useIntlNumberFormat,
  type UseIntlNumberFormatOptions,
} from '../NumberFormat/useIntlNumberFormat'

export type CurrencySymbolProps = Omit<UseIntlNumberFormatOptions, 'numberStyle'> & {
  sx?: SxProps<Theme>
  variant?: 'symbol' | 'full'
}

/** @public */
export const CurrencySymbol = forwardRef<HTMLSpanElement, CurrencySymbolProps>((props, ref) => {
  const { sx, variant = 'symbol', ...options } = props
  const formatter = useIntlNumberFormat({ ...options, numberStyle: 'currency' })

  return (
    <Box component='span' suppressHydrationWarning ref={ref} sx={sx}>
      {formatter.formatToParts(1).find((part) => part.type === 'currency')?.value}
      {options.currency && variant === 'full' && (
        <>
          {' – '}
          {options.currency} – <DisplayNames type='currency' code={options.currency} />
        </>
      )}
    </Box>
  )
})
