import styles, { ClassKeys } from '@graphcommerce/framer-sheet/styles'
import { Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ClassNameMap, StyleRules } from '@mui/styles';

type UseSheetStylesReturn = (props?: Record<string, unknown>) => ClassNameMap<ClassKeys>

const useSheetStyles = makeStyles<Theme, never, ClassKeys>(styles as StyleRules<ClassKeys>, {
  name: 'Sheet',
}) as UseSheetStylesReturn

export default useSheetStyles
