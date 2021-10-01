import { responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
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
