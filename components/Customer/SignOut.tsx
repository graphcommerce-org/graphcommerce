import { Button, makeStyles, Theme } from '@material-ui/core'
import { useMutationForm } from 'components/useMutationForm'
import { LogoutDocument } from 'generated/apollo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    form: {
      display: 'grid',
      alignItems: 'center',
      gridRowGap: theme.spacings.sm,
      gridColumnGap: theme.spacings.xs,
      paddingBottom: theme.spacings.xs,
    },
    error: {
      color: theme.palette.error.main,
    },
    actions: {
      display: 'grid',
      gridTemplateColumns: 'auto auto',
      paddingBottom: theme.spacings.xs,
      '& :last-child': {
        textAlign: 'right',
      },
    },
  }),
  { name: 'SignOut' },
)

export default function SignOut() {
  const classes = useStyles()
  const { onSubmit, result } = useMutationForm<GQLLogoutMutation, GQLLogoutMutationVariables>({
    mutation: LogoutDocument,
  })

  return (
    <form onSubmit={onSubmit} noValidate className={classes.form}>
      <Button
        type='submit'
        disabled={result.loading}
        color='primary'
        variant='contained'
        size='large'
      >
        Sign out
      </Button>

      {!result.loading && result.error?.message && (
        <div className={classes.error}>{result.error?.message}</div>
      )}
    </form>
  )
}
