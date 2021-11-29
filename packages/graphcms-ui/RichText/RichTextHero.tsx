import { responsiveTyp } from '@graphcommerce/next-ui'
import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHero = withStyles((theme: Theme) => ({
  h1: {
    ...theme.typography.h1,
    textTransform: 'uppercase',
    maxWidth: '70%',
    textAlign: 'center',
    margin: 0,
    marginBottom: theme.spacings.md,
    [theme.breakpoints.up('sm')]: {
      ...responsiveTyp(36, 82),
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      maxWidth: '100%',
    },
    '& strong': {
      WebkitTextFillColor: 'transparent',
      WebkitTextStroke: `1.2px #fff`,
    },
  },
}))(RichText)

export default RichTextHero
