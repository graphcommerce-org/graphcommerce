import { Theme, makeStyles } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

const useHeaderSpacing = makeStyles(
  ({ spacings }: Theme) => ({
    marginTop: { marginTop: `calc(${spacings.md} * 2 + ${vpCalc(46, 72)} + 3px)` },
    paddingTop: { paddingTop: `calc(${spacings.md} * 2 + ${vpCalc(46, 72)} + 3px)` },
    top: { top: `calc(${spacings.md} * 2 + ${vpCalc(46, 72)} + 3px)` },
    paddingBottom: { paddingBottom: `calc(${spacings.md} * 2 + ${vpCalc(46, 72)} + 3px)` },
    fullHeight: {
      minHeight: `calc(100vh - calc(${spacings.md} * 2 + ${vpCalc(46, 72)} + 3px))`,
    },
  }),
  { name: 'HeaderSpacing' },
)

export default useHeaderSpacing
