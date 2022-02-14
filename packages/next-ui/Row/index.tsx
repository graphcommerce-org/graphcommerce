import { Container, styled } from '@mui/material'

export const Row = styled(Container, { name: 'Row' })(({ theme }) => ({
  marginBottom: theme.spacings.xxl,
}))
