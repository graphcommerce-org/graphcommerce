import { Theme, makeStyles } from '@material-ui/core'
import { vpCalc } from '../Theme'

const useBlogViewStyles = makeStyles((theme: Theme) => ({
  last: {
    marginTop: '30px',
  },
  boxed: {
    padding: vpCalc(24, 80),
    boxShadow: '0 2px 15px 0 rgba(0, 0, 0, 0.04), 0 60px 70px -20px rgba(0, 0, 0, 0.14)',
  },
  featured: {
    display: 'flex',
    marginBottom: vpCalc(20, 50),

    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
    [theme.breakpoints.up('lg')]: {
      alignItems: 'center',
    },
  },
  assetWrapper: {
    flexBasis: '46%',
    textAlign: 'right',
    [theme.breakpoints.down('md')]: {
      flexBasis: '100%',
      marginBottom: '40px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '0 30px',
    },
  },
  asset: {
    width: '100%',
    height: 'auto',
  },
  pageTitle: {
    flex: '1 0 50%',
    marginTop: '-0.2em',

    [theme.breakpoints.up('lg')]: {
      padding: '0 0 0 30px',
    },
  },
  article: {
    [theme.breakpoints.up('md')]: {
      maxWidth: '800px',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '800px',
    },
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    '& p': {
      margin: '40px 0',
    },
  },
}))

export default useBlogViewStyles
