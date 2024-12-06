import { styled } from '@mui/material'
import { Container } from '../Container/Container'

export const Row = styled(Container, { name: 'Row' })(({ theme }) => ({
  marginBottom: theme.spacings.xxl,
}))
