import { Container, styled } from '@mui/material'

const Row = styled(Container)(
  ({ theme }) => ({
    marginBottom: theme.spacings.xxl,
  }),
  { name: 'Row' },
)

export default Row
