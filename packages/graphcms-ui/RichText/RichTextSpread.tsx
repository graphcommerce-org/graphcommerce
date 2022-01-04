import { withStyles } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'
import RichText from '.'

const RichTextSpread = withStyles(RichText, (theme: Theme) => ({
  h2: theme.typography.h4,
  paragraph: {
    [theme.breakpoints.up('md')]: {
      columnCount: 2,
      columnGap: theme.spacings.md,
    },
  },
}))

export default RichTextSpread
