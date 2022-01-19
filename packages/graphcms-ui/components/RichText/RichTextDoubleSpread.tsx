import { typography, withStyles } from '@graphcommerce/next-ui'
import { RichText } from './RichText'

export const RichTextDoubleSpread = withStyles(RichText, (theme) => ({
  h2: {
    ...typography(theme, 'h4'),
  },
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
