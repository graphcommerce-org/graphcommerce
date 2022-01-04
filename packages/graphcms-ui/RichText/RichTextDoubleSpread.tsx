import { Theme } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import RichText from '.'

const RichTextDoubleSpread = withStyles((theme: Theme) => ({
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
}))(RichText)

export default RichTextDoubleSpread
