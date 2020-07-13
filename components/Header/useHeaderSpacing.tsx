import { Theme, makeStyles } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

export const useHeaderSpacing = makeStyles(
  ({ gridSpacing }: Theme) => ({
    marginTop: { marginTop: `calc(${gridSpacing.row} * 2 + ${vpCalc(46, 72)} + 3px)` },
    paddingTop: { paddingTop: `calc(${gridSpacing.row} * 2 + ${vpCalc(46, 72)} + 3px)` },
    paddingBottom: { paddingBottom: `calc(${gridSpacing.row} * 2 + ${vpCalc(46, 72)} + 3px)` },
  }),
  { name: 'Header' },
)
