import { makeStyles } from '@material-ui/core'
import { SheetDragIndicator, SheetDragIndicatorProps, styles } from '@reachdigital/framer-sheet'
import React from 'react'
import responsiveVal from '../../Styles/responsiveVal'

const useStyles = makeStyles(
  () => ({
    indicatorRoot: {
      ...styles.indicatorRoot,
    },
    indicatorRoottop: {
      ...styles.indicatorRoottop,
      padding: `${responsiveVal(4, 12)} 4px`,
    },
    indicatorRootbottom: {
      ...styles.indicatorRootbottom,
      padding: `${responsiveVal(4, 12)} 4px`,
    },
    indicatorRootleft: {
      ...styles.indicatorRootleft,
    },
    indicatorRootright: {
      ...styles.indicatorRootright,
    },
    indicator: {
      ...styles.indicator,
      borderRadius: 99,
      backgroundColor: '#ddd',
    },
    indicatortop: { ...styles.indicatortop, width: 40, height: 4 },
    indicatorbottom: { ...styles.indicatorbottom, width: 40, height: 4 },
    indicatorleft: { ...styles.indicatorleft, width: 4, height: 40 },
    indicatorright: { ...styles.indicatorright, width: 4, height: 40 },
  }),
  { name: 'SheetShellDragIndicator' },
)

type SheetShellDragIndicatorProps = SheetDragIndicatorProps

export default function SheetShellDragIndicator(props: SheetShellDragIndicatorProps) {
  const classes = useStyles()

  return <SheetDragIndicator {...props} classes={classes} />
}
