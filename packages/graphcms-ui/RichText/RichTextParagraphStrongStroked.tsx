import { withStyles } from '@graphcommerce/next-ui'
import RichText from '.'

const RichTextParagraphStrongStroked = withStyles(RichText, (theme) => ({
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
}))

export default RichTextParagraphStrongStroked
