import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHeadingStrongStroked = withStyles((theme: Theme) => ({
  h2: {
    ...theme.typography.h1,
    fontSize: `calc(${theme.typography.h1.fontSize}*1.1)`,
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      fontSize: `calc(${theme.typography.h1.fontSize}*1.3)`,
    },
    WebkitTextStroke: `0.9px ${theme.palette.text.primary}`,
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: `0.9px ${theme.palette.text.primary}`,
    },
    [theme.breakpoints.up('md')]: {
      WebkitTextStroke: `1.2x ${theme.palette.text.primary}`,
    },
  },
}))(RichText)

export default RichTextHeadingStrongStroked
