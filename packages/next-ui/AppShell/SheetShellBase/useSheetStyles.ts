import { makeStyles, StyleRules, Theme } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'
import styles, { ClassKeys } from '@reachdigital/framer-sheet/styles'

const muiStyles = styles as StyleRules<ClassKeys>

const useSheetStyles = makeStyles<Theme, never, ClassKeys>(muiStyles, {
  name: 'Sheet',
}) as () => ClassNameMap<ClassKeys>

export default useSheetStyles
