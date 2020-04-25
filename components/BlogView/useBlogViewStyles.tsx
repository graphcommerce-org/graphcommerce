import { Theme, makeStyles } from '@material-ui/core'
import { vpCalc } from '../Theme'

const useBlogViewStyles = makeStyles((theme: Theme) => ({
  last: {
    marginTop: '30px',
  },
  boxed: {
    padding: 'calc(8px + 5vw)',
    boxShadow: '0 2px 15px 0 rgba(0, 0, 0, 0.04), 0 60px 70px -20px rgba(0, 0, 0, 0.14)',
  },
  featured: {
    display: 'flex',
    marginBottom: vpCalc(20, 50),
  },
  assetWrapper: {
    flexBasis: '46%',
    textAlign: 'right',
  },
  asset: {
    width: '100%',
    height: 'auto',
  },
  pageTitle: {
    flex: '1 0 50%',
    marginTop: '-0.2em',
  },
  article: {
    '& img': {
      maxWidth: '100%',
      height: 'auto',
    },
    '& p': {
      margin: '40px 0',
    },
  },
  '@media only screen and (max-width: 1023px)': {
    featured: {
      flexFlow: 'column wrap',
    },
    assetWrapper: {
      flexBasis: '100%',
    },
  },
  '@media only screen and (min-width: 1024px)': {
    featured: {
      alignItems: 'center',
    },
    pageTitle: {
      padding: '0 0 0 30px',
    },
    assetWrapper: {
      padding: '0 30px',
    },
  },
}))

export default useBlogViewStyles
