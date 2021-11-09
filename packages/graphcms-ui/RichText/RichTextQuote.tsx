import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextQuote = withStyles((theme: Theme) => ({
  paragraph: {
    ...theme.typography.h4,
    fontWeight: 600,
    textTransform: 'uppercase',
    maxWidth: '60%',
    textAlign: 'center',
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '80%',
    },
  },
}))(RichText)

export default RichTextQuote
