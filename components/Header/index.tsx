import React from 'react'
import { Theme, makeStyles } from '@material-ui/core'
import logo from '../../public/images/magento-webshop-reach-digital.svg'
import { vpCalc } from '../Theme'

const useStyles = makeStyles(({ gridSpacing, palette }: Theme) => ({
  root: {
    backgroundColor: palette.background.paper,
    display: 'grid',
    gridTemplateAreas: `
      'spaceleft before before before spaceright'
      'spaceleft menu logo contact spaceright'`,
    gridTemplateColumns: `${gridSpacing.column} 46px auto 46px ${gridSpacing.column}`,
    gridTemplateRows: `${gridSpacing.row} auto`,
    alignItems: 'center',
    justifyItems: 'center',
    width: '100%',
  },
  logo: {
    gridArea: 'logo',
    maxHeight: vpCalc(46, 72),
    display: 'block',
  },
  menu: {
    gridArea: 'menu',
  },
}))

const Header: React.FC = ({ children }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <img src={logo} alt='Logo' className={classes.logo} />
      <div className={classes.menu}>{children}</div>
    </div>
  )
}

export default Header
