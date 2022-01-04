import { breakpointVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import RichText from '.'

const RichTextHeadingStrongStroked = withStyles((theme: Theme) => ({
  h2: {
    ...theme.typography.h1,
    textTransform: 'uppercase',
    color: theme.palette.text.primary,
    [theme.breakpoints.up('sm')]: {
      ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
    },
    '& strong': {
      // https://github.com/rsms/inter/issues/292#issuecomment-674993644
      color: theme.palette.background.default,
      textShadow: `1.2px 0 0 ${theme.palette.text.primary},0 1.2px 0 ${theme.palette.text.primary},-1.2px 0 0 ${theme.palette.text.primary},0 -1.2px 0 ${theme.palette.text.primary}`,
    },
    [theme.breakpoints.up('md')]: {},
  },
}))(RichText)

export default RichTextHeadingStrongStroked
