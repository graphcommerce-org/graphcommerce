import { makeStyles, Theme } from '@material-ui/core'

const useFormStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      padding: `${theme.spacings.xxs} 0`,
    },
    formContained: {
      background: '#f7f7f7',
      padding: `${theme.spacings.xxs} calc(${theme.spacings.xxs} * 2)`,
      overflow: 'hidden',
      borderRadius: 6,
    },
    formRow: {
      paddingTop: theme.spacings.xxs,
      paddingBottom: theme.spacings.xxs,
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fit, minmax(200px, 1fr))`,
      gap: `calc(${theme.spacings.xxs} * 2)`,
    },
    actions: {
      paddingTop: theme.spacings.xxs,
      paddingBottom: theme.spacings.md,
      justifyContent: 'center',
      display: 'grid',
      gridAutoFlow: 'column',
      gap: `calc(${theme.spacings.xxs} * 2)`,
    },
    checkmark: {
      color: theme.palette.success.main,
    },
    helperList: {
      ...theme.typography.body2,
      paddingLeft: theme.spacings.xs,
    },
    divider: {
      background: theme.palette.divider,
      height: 1,
      width: '100%',
      marginTop: theme.spacings.xxs,
      marginBottom: theme.spacings.xxs,
    },
  }),
  { name: 'FormStyles' },
)

export default useFormStyles
