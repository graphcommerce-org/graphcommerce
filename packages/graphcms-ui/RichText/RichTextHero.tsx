import { responsiveVal } from '@graphcommerce/next-ui'
import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHero = withStyles((theme: Theme) => ({
  h1: {
    textTransform: 'uppercase',
    maxWidth: '70%',
    textAlign: 'center',
    fontSize: responsiveVal(42, 50),
    marginBottom: theme.spacings.md,
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      fontSize: responsiveVal(18, 90),
      maxWidth: '100%',
    },
    '& strong': {
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: `1.2px #fff`,
    },
  },
}))(RichText)

export default RichTextHero
