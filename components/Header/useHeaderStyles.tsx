import { makeStyles } from '@material-ui/styles'
import { Theme } from '@material-ui/core'
import { vpCalc } from 'components/Theme'

export const useHeaderStyles = makeStyles(
  ({ gridSpacing }: Theme) => ({
    navigation: {
      position: 'fixed',
      top: 0,
      display: 'grid',
      gridTemplateAreas: `
      'menu logo contact'`,
      padding: `${gridSpacing.row} ${gridSpacing.column}`,
      gridTemplateColumns: `46px auto 46px`,
      gridTemplateRows: `auto`,
      justifyItems: 'center',
      width: '100%',
      // 2xGridspacing, Logo Height, Logo Margin
      marginBottom: `calc(${gridSpacing.row} * -2 + ${vpCalc(46, 72)} * -1 - 3px)`,
    },
    logo: {
      gridArea: 'logo',
    },
    logoImg: { maxHeight: vpCalc(46, 72), display: 'block', marginTop: 3 },
    menu: { gridArea: 'menu' },
    contact: { gridArea: 'contact' },
    avatar: { backgroundColor: 'transparent' },
    avatarFab: { boxShadow: 'none' },
    avatarImg: { display: 'block' },
    avatarPhone: { padding: 0 },
    avatarPhoneIcon: { fontSize: 12 },
    headerDecoration: {
      width: 235,
      height: 200,
      left: -60,
      top: -60,
      position: 'absolute',
      zIndex: 1,
      pointerEvents: 'none',
    },
    headerDecorationLarge: {
      top: -55,
      left: -70,
      width: '40vw',
      height: '24vw',
      position: 'absolute',
      zIndex: 0,
      pointerEvents: 'none',
      filter: 'blur(30px)',
    },
  }),
  { name: 'Header' },
)
