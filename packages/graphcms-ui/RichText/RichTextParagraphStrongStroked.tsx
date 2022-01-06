import { typography, withStyles } from '@graphcommerce/next-ui'
import RichText from '.'

const RichTextParagraphStrongStroked = withStyles(RichText, (theme) => ({
  paragraph: {
    ...typography(theme, 'body2'),
    textTransform: 'uppercase' as const,
    maxWidth: '100%',
    fontWeight: 600,
    textAlign: 'left' as const,
    [theme.breakpoints.up('md')]: {
      ...typography(theme, 'h3'),
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
