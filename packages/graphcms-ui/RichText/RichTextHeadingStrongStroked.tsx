import { responsiveVal } from '@graphcommerce/next-ui'
import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHeadingStrongStroked = withStyles((theme: Theme) => ({
  h2: {
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    WebkitTextStroke: `0.9px ${theme.palette.text.primary}`,
    fontSize: responsiveVal(18, 50),
    marginTop: responsiveVal(8, 20),
    marginBottom: responsiveVal(18, 20),
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: `0.9px ${theme.palette.text.primary}`,
    },
    [theme.breakpoints.up('md')]: {
      fontSize: responsiveVal(18, 60),
      WebkitTextStroke: `1.2x ${theme.palette.text.primary}`,
    },
  },
}))(RichText)

export default RichTextHeadingStrongStroked
