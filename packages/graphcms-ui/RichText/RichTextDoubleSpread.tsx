import { withStyles } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material'
import RichText from '.'

const RichTextDoubleSpread = withStyles(RichText, (theme: Theme) => ({
  h2: theme.typography.h4,
  paragraph: {
    [theme.breakpoints.up('sm')]: {
      columnCount: 2,
      columnGap: theme.spacings.md,
    },
    [theme.breakpoints.up('lg')]: {
      columnCount: 3,
      columnGap: theme.spacings.md,
    },
  },
}))

export default RichTextDoubleSpread
