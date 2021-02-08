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
    submitButton: {
      // width: '50%',
      // maxWidth: 'unset',
      // borderRadius: 8,
      // margin: `${theme.spacings.xs} auto`,
      // display: 'block',
      // marginTop: theme.spacings.md,
      // marginBottom: theme.spacings.lg,
      // textAlign: 'center',
    },
    checkmark: {
      color: theme.palette.success.main,
    },
    helperList: {
      ...theme.typography.body2,
      paddingLeft: theme.spacings.xs,
    },
  }),
  { name: 'FormStyles' },
)

export default useFormStyles
