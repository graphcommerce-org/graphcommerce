import { Container, styled } from '@mui/material'

const ColumnOne = styled(Container)(
  ({ theme }) => ({
    maxWidth: 820,
    marginBottom: theme.spacings.lg,
  }),
  { name: 'ColumnOne' },
)

export default ColumnOne
