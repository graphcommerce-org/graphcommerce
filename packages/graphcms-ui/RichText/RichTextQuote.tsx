import { Theme } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import RichText from '.'

const RichTextQuote = withStyles((theme: Theme) => ({
  paragraph: {
    ...theme.typography.h4,
    fontWeight: 600,
    '@supports (font-variation-settings: normal)': {
      fontVariationSettings: "'wght' 620",
    },
    textTransform: 'uppercase',
    maxWidth: '60%',
    textAlign: 'center',
    margin: '0 auto',
    [theme.breakpoints.up('lg')]: {
      maxWidth: '80%',
    },
  },
}))(RichText)

export default RichTextQuote
