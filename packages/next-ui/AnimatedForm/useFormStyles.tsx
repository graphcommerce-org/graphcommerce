import { makeStyles, Theme } from '@material-ui/core'

const useFormStyles = makeStyles((theme: Theme) => ({
  form: {
    display: 'grid',
    alignItems: 'center',
  },
  formContained: {
    background: '#f7f7f7',
    padding: theme.spacings.xxs,
    overflow: 'hidden',
    borderRadius: 6,
  },
  formRow: {
    padding: theme.spacings.xxs,
  },
  actions: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    paddingBottom: theme.spacings.xs,
    '& :last-child': {
      textAlign: 'right',
    },
  },
}))

export default useFormStyles
