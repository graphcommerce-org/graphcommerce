import { Theme, withStyles } from '@material-ui/core'
import { responsiveVal } from '@graphcommerce/next-ui'
import RichText from '.'

const RichTextQuote = withStyles((theme: Theme) => ({
  paragraph: {
    fontWeight: 600,
    textTransform: 'uppercase',
    maxWidth: '60%',
    textAlign: 'center',
    margin: '0 auto',
    fontSize: responsiveVal(14, 26),
    [theme.breakpoints.up('lg')]: {
      maxWidth: '80%',
    },
  },
}))(RichText)

export default RichTextQuote
