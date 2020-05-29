import { Theme, makeStyles } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

const useBlogViewStyles = makeStyles(
  (theme: Theme) => ({
    boxed: {
      padding: vpCalc(24, 80),
      boxShadow: theme.shadows[24],
    },
    featured: {
      display: 'flex',
      flexDirection: 'column',

      [theme.breakpoints.up('md')]: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: vpCalc(20, 50),
      },
    },
    assetWrapper: {
      textAlign: 'right',
      flexBasis: '100%',
      width: '100%',
      marginBottom: '40px',

      [theme.breakpoints.up('md')]: {
        paddingRight: vpCalc(20, 60),
        flexBasis: '46%',
        marginBottom: 0,
      },
    },
    asset: {
      width: '100%',
      height: 'auto',
    },
    pageTitle: {
      flex: '1 0 50%',
      padding: 0,

      [theme.breakpoints.up('md')]: {
        margin: 0,
        paddingRight: vpCalc(10, 30),
      },
    },
  }),
  { name: 'BlogView' },
)

export default useBlogViewStyles
