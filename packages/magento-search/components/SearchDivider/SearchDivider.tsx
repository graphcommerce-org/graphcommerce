import { styled } from '@mui/material'

export const SearchDivider = styled('div', { name: 'SearchDivider' })(({ theme }) => ({
  borderBottom: `1px solid ${theme.vars.palette.divider}`,
  width: '100%',
  marginTop: theme.spacings.md,
  marginBottom: theme.spacings.md,
}))
