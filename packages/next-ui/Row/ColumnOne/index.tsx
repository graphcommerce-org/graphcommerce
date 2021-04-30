import { Container, styled } from '@material-ui/core'

const ColumnOne = styled(Container)(
  ({ theme }) => ({
    maxWidth: 820,
    marginBottom: theme.spacings.lg,
  }),
  { name: 'ColumnOne' },
)

export default ColumnOne
