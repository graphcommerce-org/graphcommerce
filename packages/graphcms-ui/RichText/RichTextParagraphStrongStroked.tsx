import { responsiveVal } from '@graphcommerce/next-ui'
import { Theme, withStyles } from '@material-ui/core'
import RichText from '.'

const RichTextParagraphStrongStroked = withStyles((theme: Theme) => ({
  paragraph: {
    ...theme.typography.body2,
    textTransform: 'uppercase',
    maxWidth: '100%',
    fontWeight: 600,
    textAlign: 'left',
    [theme.breakpoints.up('md')]: {
      ...theme.typography.h3,
      fontWeight: 600,
      maxWidth: '100%',
    },
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: '1.2px #fff',
    },
  },
}))(RichText)

export default RichTextParagraphStrongStroked
