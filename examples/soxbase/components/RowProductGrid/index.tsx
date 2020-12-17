import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { RowProductGridFragment } from './RowProductGrid.gql'

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginBottom: `${theme.spacings.lg}`,
    [theme.breakpoints.up('md')]: {
      marginBottom: `${theme.spacings.xl}`,
    },
  },
  title: {
    textTransform: 'uppercase',
  },
}))

export default function RowProductGrid(props: RowProductGridFragment) {
  const { title, pageLinks } = props
  const classes = useStyles()

  return (
    <Container maxWidth={false} className={classes.container}>
      <Typography variant='h2' className={classes.title}>
        {title}
      </Typography>
    </Container>
  )
}
