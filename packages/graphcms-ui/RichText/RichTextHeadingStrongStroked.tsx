import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextHeadingStrongStroked = withStyles((theme: Theme) => ({
  h2: {
    ...theme.typography.h1,
    fontSize: `calc(${theme.typography.h1.fontSize}*1.8)`,
    fontWeight: 600,
    lineHeight: 0.7,
    maxWidth: '70%',
    textAlign: 'center',
    marginBottom: theme.spacings.md,
    [theme.breakpoints.up('sm')]: {
      fontSize: `calc(${theme.typography.h1.fontSize}*1.8)`,
    },
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      maxWidth: '100%',
    },
    '& strong': {
      fontFamily: theme.typography.fontFamily,
      textTransform: 'uppercase',
      fontSize: `calc(${theme.typography.h1.fontSize}*0.8)`,
    },
  },
}))(RichText)

export default RichTextHeadingStrongStroked
