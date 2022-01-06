import { breakpointVal, typography, withStyles } from '@graphcommerce/next-ui'
import RichText from '.'

const RichTextHeadingStrongStroked = withStyles(RichText, (theme) => ({
  h2: {
    ...typography(theme, 'h1'),
    textTransform: 'uppercase' as const,
    color: theme.palette.text.primary,
    ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
    '& strong': {
      // https://github.com/rsms/inter/issues/292#issuecomment-674993644
      color: theme.palette.background.default,
      textShadow: `1.2px 0 0 ${theme.palette.text.primary},0 1.2px 0 ${theme.palette.text.primary},-1.2px 0 0 ${theme.palette.text.primary},0 -1.2px 0 ${theme.palette.text.primary}`,
    },
  },
}))

export default RichTextHeadingStrongStroked
