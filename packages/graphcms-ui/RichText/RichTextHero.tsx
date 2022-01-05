import { breakpointVal, withStyles } from '@graphcommerce/next-ui'
import RichText from '.'

const RichTextHero = withStyles(RichText, (theme) => ({
  h1: {
    ...theme.typography.h1,
    textTransform: 'uppercase' as const,
    maxWidth: '70%',
    textAlign: 'center' as const,
    margin: 0,
    marginBottom: theme.spacings.md,
    ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
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
