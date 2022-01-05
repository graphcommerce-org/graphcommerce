import { withStyles } from '@graphcommerce/next-ui'
import RichText from '.'

const RichTextSpread = withStyles(RichText, (theme) => ({
  h2: theme.typography.h4,
  paragraph: {
    [theme.breakpoints.up('md')]: {
      columnCount: 2,
      columnGap: theme.spacings.md,
    },
  },
}))

export default RichTextSpread
