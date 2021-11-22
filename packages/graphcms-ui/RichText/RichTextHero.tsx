import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHero = withStyles((theme: Theme) => ({
  h1: {
    ...theme.typography.h1,
    fontSize: `calc(${theme.typography.h1.fontSize}*2.2)`,
    fontWeight: 600,
    lineHeight: 0.8,
    maxWidth: '70%',
    textAlign: 'center',
    marginBottom: theme.spacings.md,
    [theme.breakpoints.up('sm')]: {
      fontSize: `calc(${theme.typography.h1.fontSize}*2.2)`,
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      maxWidth: '100%',
    },
    '& strong': {
      fontFamily: theme.typography.fontFamily,
      textTransform: 'uppercase',
      fontSize: `calc(${theme.typography.h1.fontSize}*1.0)`,
    },
  },
}))(RichText)

export default RichTextHero
