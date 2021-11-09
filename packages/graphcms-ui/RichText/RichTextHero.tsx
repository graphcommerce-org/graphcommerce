import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHero = withStyles((theme: Theme) => ({
  h1: {
    ...theme.typography.h1,
    fontSize: `calc(${theme.typography.h1.fontSize}*1.5)`,
    textTransform: 'uppercase',
    maxWidth: '70%',
    textAlign: 'center',
    marginBottom: theme.spacings.md,
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
