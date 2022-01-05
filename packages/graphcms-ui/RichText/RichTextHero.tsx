import { breakpointVal, withStyles } from '@graphcommerce/next-ui'
import RichText from '.'

const RichTextHero = withStyles(RichText, (theme) => ({
  h1: {
    ...theme.typography.h1,
    textTransform: 'uppercase',
    maxWidth: '70%',
    textAlign: 'center',
    margin: 0,
    marginBottom: theme.spacings.md,
    [theme.breakpoints.up('sm')]: {
      ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
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
}))

export default RichTextHero
