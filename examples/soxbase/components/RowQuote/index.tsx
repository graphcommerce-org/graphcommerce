import { Container, Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import RichText from '@reachdigital/graphcms-ui/RichText'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import { RowQuoteFragment } from './RowQuote.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    container: {
      marginBottom: `${theme.spacings.xl}`,
    },
  }),
  { name: 'RowQuote' },
)

const useRichTextOne = makeStyles((theme: Theme) => ({
  paragraph: {
    'font-weight': 600,
    textTransform: 'uppercase',
    maxWidth: '80%',
    textAlign: 'center',
    margin: '0 auto',
    fontSize: responsiveVal(14, 26),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '50%',
    },
  },
}))

export default function RowQuote(props: RowQuoteFragment) {
  const { quote } = props
  const classes = useStyles()
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <RichText classes={richTextOneClasses} {...quote} />
    </Container>
  )
}
