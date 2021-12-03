import { Container, styled } from '@material-ui/core'

const Row = styled(Container)(
  ({ theme }) => ({
    marginBottom: theme.spacings.xxl,
  }),
  { name: 'Row' },
)

export default Row
