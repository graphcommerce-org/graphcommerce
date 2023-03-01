import { Container, styled } from '@mui/material'

export const Row = styled(Container, { name: 'Row' })(({ theme }) =>
  theme.unstable_sx({
    marginBottom: theme.spacings.xxl,
  }),
)
