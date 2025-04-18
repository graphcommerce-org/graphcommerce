import { sxx } from '@graphcommerce/next-ui'
import type { BoxProps } from '@mui/material'
import { Box } from '@mui/material'

export type StoreChipProps = { label: string; variant: 'primary' | 'outlined' } & BoxProps
export function StoreChip({ label, variant, sx, ...boxProps }: StoreChipProps) {
  return (
    <Box
      {...boxProps}
      sx={sxx(
        (theme) => ({
          borderRadius: '9999px',
          padding: '3px 10px',
          fontSize: '14px',
          textAlign: 'center',
          ...(variant === 'primary' && {
            background: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          }),
          ...(variant === 'outlined' && {
            color: theme.palette.primary.main,
            border: `1px solid ${theme.palette.primary.main}`,
          }),
        }),
        sx,
      )}
    >
      <strong>{label}</strong>
    </Box>
  )
}
