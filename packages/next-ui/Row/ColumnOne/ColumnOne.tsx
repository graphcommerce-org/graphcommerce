import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'

export const ColumnOne = styled(Container, { name: 'ColumnOne' })(({ theme }) => ({
  maxWidth: 820,
  marginBottom: theme.spacings.lg,
}))
