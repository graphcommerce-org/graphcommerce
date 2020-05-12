import { Theme, makeStyles } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

const useBlogViewStyles = makeStyles(
  (theme: Theme) => ({
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

      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
      [theme.breakpoints.up('sm')]: {
        alignItems: 'center',
      },
    },
    assetWrapper: {
      flexBasis: '46%',
      textAlign: 'right',
      [theme.breakpoints.down('sm')]: {
        flexBasis: '100%',
        width: '100%',
        marginBottom: '40px',
      },
      [theme.breakpoints.up('md')]: {
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
      padding: vpCalc(10, 30),

      [theme.breakpoints.down('sm')]: {
        paddingLeft: 0,
        paddingRight: 0,
      },

      [theme.breakpoints.up('lg')]: {
        padding: '0 0 0 30px',
      },
    },
    article: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: '800px',
      },
      [theme.breakpoints.up('lg')]: {
        maxWidth: '800px',
      },
      '& img': {
        maxWidth: '100%',
        height: 'auto',
      },
    },
  }),
  { name: 'BlogView' },
)

export default useBlogViewStyles
