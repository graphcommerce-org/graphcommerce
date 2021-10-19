import { Container, styled } from '@material-ui/core'

const Row = styled(Container)(
  ({ theme }) => ({
    marginBottom: theme.spacings.xl,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  }),
  { name: 'Row' },
)

export default Row
