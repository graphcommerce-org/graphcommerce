import { Container, makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '../../Styles'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
  }),
  { name: 'Quote' },
)

type QuoteProps = UseStyles<typeof useStyles> & {
  children: React.ReactElement
}

export default function Quote(props: QuoteProps) {
  const { children } = props
  const classes = useStyles(props)

  return <Container className={classes.container}>{children}</Container>
}
