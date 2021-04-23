import { Container, makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from '../../Styles'
import responsiveVal from '../../Styles/responsiveVal'

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

type QuoteProps = UseStyles<typeof useStyles & typeof useRichTextOne> & {
  RichContent: (props) => React.ReactElement
}

export default function Quote(props: QuoteProps) {
  const { RichContent } = props
  const classes = useStyles(props)
  const richTextOneClasses = useRichTextOne(props)

  return (
    <Container maxWidth={false} className={classes.container}>
      <RichContent classes={richTextOneClasses} />
    </Container>
  )
}
