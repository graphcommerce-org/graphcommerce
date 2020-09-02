import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { vpCalc } from 'components/Theme'

const useHeaderStyles = makeStyles(
  ({ gridSpacing, zIndex }: Theme) => ({
    navigation: {
      position: 'fixed',
      top: 0,
      display: 'grid',
      gridTemplateAreas: `'menu logo secondary'`,
      padding: `${gridSpacing.row} ${gridSpacing.column}`,
      gridTemplateColumns: `46px auto calc(46px * 3)`,
      gridTemplateRows: `auto`,
      justifyItems: 'center',
      width: '100%',
      zIndex: zIndex.appBar,
      // 2xGridspacing, Logo Height, Logo Margin
      marginBottom: `calc(${gridSpacing.row} * -2 + ${vpCalc(46, 72)} * -1 - 3px)`,
      pointerEvents: 'none',
    },
    logo: {
      gridArea: 'logo',
      pointerEvents: 'all',
    },
    logoImg: {
      maxHeight: vpCalc(46, 72),
      display: 'block',
      marginTop: 3,
      width: 'auto',
      height: 'auto',
    },
    menu: { gridArea: 'menu', pointerEvents: 'all' },
    secondary: {
      gridArea: 'secondary',
      justifySelf: 'flex-end',
      '& > * > *': { pointerEvents: 'all' },
    },
  }),
  { name: 'Header' },
)

export default useHeaderStyles
