import Container from '@mui/material/Container'
import { styled } from '@mui/material/styles'

export const Row = styled(Container, { name: 'Row' })(({ theme }) => ({
  marginBottom: theme.spacings.xxl,
}))
