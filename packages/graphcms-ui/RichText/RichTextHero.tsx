import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHero = withStyles((theme: Theme) => ({
  h1: {
    ...theme.typography.h1,
    fontSize: `calc(${theme.typography.h1.fontSize}*1.1)`,
    textTransform: 'uppercase',
    maxWidth: '70%',
    textAlign: 'center',
    margin: 0,
    marginBottom: theme.spacings.md,
    [theme.breakpoints.up('sm')]: {
      fontSize: `calc(${theme.typography.h1.fontSize}*1.3)`,
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
