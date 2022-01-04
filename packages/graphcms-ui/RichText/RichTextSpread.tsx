import { Theme } from '@mui/material'
import withStyles from '@mui/styles/withStyles'
import RichText from '.'

const RichTextSpread = withStyles((theme: Theme) => ({
  h2: theme.typography.h4,
  paragraph: {
    [theme.breakpoints.up('md')]: {
      columnCount: 2,
      columnGap: theme.spacings.md,
    },
  },
}))(RichText)

export default RichTextSpread
