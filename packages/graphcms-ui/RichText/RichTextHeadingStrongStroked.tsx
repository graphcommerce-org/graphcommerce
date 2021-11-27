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
    '& strong': {
      // https://github.com/rsms/inter/issues/292#issuecomment-674993644
      color: theme.palette.background.default,
      textShadow: `1.2px 0 0 ${theme.palette.text.primary},0 1.2px 0 ${theme.palette.text.primary},-1.2px 0 0 ${theme.palette.text.primary},0 -1.2px 0 ${theme.palette.text.primary}`,
    },
    [theme.breakpoints.up('md')]: {},
  },
}))(RichText)

export default RichTextHeadingStrongStroked
