import { Container, styled } from '@mui/material'

export const ColumnOne = styled(Container, { name: 'ColumnOne' })(({ theme }) => ({
  maxWidth: 820,
  marginBottom: theme.spacings.lg,
}))
