import { Box } from '@mui/material'

export function StoreChip({ label, variant }: { label: string; variant: 'primary' | 'outlined' }) {
  return (
    <Box
      sx={(theme) => ({
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
      })}
    >
      <strong>{label}</strong>
    </Box>
  )
}
