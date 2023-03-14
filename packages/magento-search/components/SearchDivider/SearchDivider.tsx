import { styled } from '@mui/material/styles'

export const SearchDivider = styled('div', { name: 'SearchDivider' })(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  width: '100%',
  marginTop: theme.spacings.md,
  marginBottom: theme.spacings.md,
}))
