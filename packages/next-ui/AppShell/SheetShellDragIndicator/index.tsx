import {
  SheetDragIndicator,
  SheetDragIndicatorProps,
  styles as sheetStyles,
  ClassKeys,
} from '@graphcommerce/framer-sheet'
import { StyleRules } from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import responsiveVal from '../../Styles/responsiveVal'

const styles = sheetStyles as StyleRules<ClassKeys>

const useStyles = makeStyles(
  () => ({
    indicatorRoot: {
      ...styles.indicatorRoot,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
    },
    indicatorRoottop: {
      ...styles.indicatorRoottop,
      padding: `${responsiveVal(4, 8)} 4px 4px 4px`,
    },
    indicatorRootbottom: {
      ...styles.indicatorRootbottom,
      padding: `${responsiveVal(4, 8)} 4px 4px 4px`,
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
    indicatortop: { ...styles.indicatortop, width: responsiveVal(12, 40), height: 4 },
    indicatorbottom: { ...styles.indicatorbottom, width: responsiveVal(12, 40), height: 4 },
    indicatorleft: { ...styles.indicatorleft, width: 4, height: responsiveVal(12, 40) },
    indicatorright: { ...styles.indicatorright, width: 4, height: responsiveVal(12, 40) },
  }),
  { name: 'SheetShellDragIndicator' },
)

type SheetShellDragIndicatorProps = SheetDragIndicatorProps

export default function SheetShellDragIndicator(props: SheetShellDragIndicatorProps) {
  const classes = useStyles()

  return <SheetDragIndicator {...props} classes={classes} />
}
