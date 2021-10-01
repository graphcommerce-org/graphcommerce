import { Container, styled } from '@mui/material'

const Row = styled(Container)(
  ({ theme }) => ({
    marginBottom: theme.spacings.lg,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  }),
  { name: 'Row' },
)

export default Row
