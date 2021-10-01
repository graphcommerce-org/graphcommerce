import styles, { ClassKeys } from '@graphcommerce/framer-sheet/styles'
import { Theme } from '@mui/material'
import { ClassNameMap, StyleRules } from '@mui/styles'
import makeStyles from '@mui/styles/makeStyles'

type UseSheetStylesReturn = (props?: Record<string, unknown>) => ClassNameMap<ClassKeys>

const useSheetStyles = makeStyles<Theme, never, ClassKeys>(
  styles as StyleRules<Record<string, unknown>, ClassKeys>,
  { name: 'Sheet' },
) as UseSheetStylesReturn

export default useSheetStyles
