import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { RowProductGridFragment } from './RowProductGrid.gql'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: `${theme.spacings.lg}`,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  },
}))

export default function RowProductGrid(props: RowProductGridFragment) {
  const { title, pageLinks } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.container}>
      <h2>{title}</h2>
    </Container>
  )
}
