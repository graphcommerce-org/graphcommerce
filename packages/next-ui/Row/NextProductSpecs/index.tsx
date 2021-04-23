import { Container, makeStyles, Theme, Typography } from '@material-ui/core'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    marginBottom: `${theme.spacings.xl}`,
    ...theme.typography.body1,
  },
  title: {
    ...theme.typography.caption,
    borderBottom: `1px solid ${theme.palette.divider}`,
    marginBottom: theme.spacings.sm,
    paddingBottom: theme.spacings.sm,
  },
  specs: {
    display: 'grid',
    justifyContent: 'start',
  },
}))

type NextProductSpecsProps = UseStyles<typeof useStyles> & {
  title: string
  productSpecs: React.ReactNode
}

export default function NextProductSpecs(props: NextProductSpecsProps) {
  const { title, productSpecs } = props
  const classes = useStyles(props)

  return (
    <Container className={classes.root}>
      <Typography variant='h3' className={classes.title}>
        {title}
      </Typography>
      <div className={classes.specs}>{productSpecs}</div>
    </Container>
  )
}
