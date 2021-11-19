import styles, { ClassKeys } from '@graphcommerce/framer-sheet/styles'
import { makeStyles, StyleRules, Theme } from '@material-ui/core'
import { ClassNameMap } from '@material-ui/styles'

type UseSheetStylesReturn = (props?: Record<string, unknown>) => ClassNameMap<ClassKeys>

const useSheetStyles = makeStyles<Theme, never, ClassKeys>(
  (theme: Theme) => ({
    ...(styles as StyleRules<ClassKeys>),
    content: {
      ...(styles.content as any),
      backgroundColor: theme.palette.background.default,
    },
  }),
  { name: 'Sheet' },
) as UseSheetStylesReturn

export default useSheetStyles
