import { Theme, makeStyles } from '@material-ui/core'
import responsiveVal from 'components/Styles/responsiveVal'

const useHeaderSpacing = makeStyles(
  (theme: Theme) => ({
    pageAction: {
      [theme.breakpoints.down('sm')]: {},
      [theme.breakpoints.up('md')]: { marginTop: 96 },
    },
    spaceAfterAction: {},

    marginTop: { marginTop: 96 },
    paddingTop: { paddingTop: 96 },
    top: {
      [theme.breakpoints.down('sm')]: {
        top: 0,
      },
      [theme.breakpoints.up('md')]: {
        left: responsiveVal(20, 30),
        top: `calc(${responsiveVal(20, 30)} * 2 + 50px)`,
      },
      // top: `calc(${theme.spacings.md} * 2 + ${vpCalc(46, 72)} + 3px)`,
    },
    paddingBottom: {
      paddingBottom: `calc(${theme.spacings.md} * 2 + ${responsiveVal(46, 72)} + 3px)`,
    },
    fullHeight: {
      minHeight: `calc(100vh - calc(${theme.spacings.md} * 2 + ${responsiveVal(46, 72)} + 3px))`,
    },
  }),
  { name: 'HeaderSpacing' },
)

export default useHeaderSpacing
