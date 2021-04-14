import { makeStyles, StyleRules, Theme } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import styles, { ClassKeys } from '@reachdigital/framer-sheet/styles'

const useSheetStyles = makeStyles<Theme, never, ClassKeys>(
  () => ({
    ...(styles as StyleRules<ClassKeys>),
  }),
  { name: 'Sheet' },
) as () => ClassNameMap<ClassKeys>

export default useSheetStyles
