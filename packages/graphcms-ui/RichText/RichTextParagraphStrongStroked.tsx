import { responsiveVal } from '@graphcommerce/next-ui'
import { Theme } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import RichText from '.'

const RichTextParagraphStrongStroked = withStyles((theme: Theme) => ({
  paragraph: {
    textTransform: 'uppercase',
    maxWidth: '100%',
    fontWeight: 600,
    textAlign: 'left',
    fontSize: responsiveVal(11, 20),
    [theme.breakpoints.up('md')]: {
      maxWidth: '100%',
      fontSize: responsiveVal(16, 34),
    },
    '& strong': {
      color: 'transparent',
      WebkitTextStroke: '1.2px #fff',
    },
  },
}))(RichText)

export default RichTextParagraphStrongStroked
