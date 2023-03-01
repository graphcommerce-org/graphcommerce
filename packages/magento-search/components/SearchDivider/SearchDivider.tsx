import { styled } from '@mui/material'

export const SearchDivider = styled('div', { name: 'SearchDivider' })(({ theme }) =>
  theme.unstable_sx({
    borderBottom: `1px solid ${theme.palette.divider}`,
    width: '100%',
    marginTop: theme.spacings.md,
    marginBottom: theme.spacings.md,
  }),
)
