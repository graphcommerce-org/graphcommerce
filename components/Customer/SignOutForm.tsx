import { Button, ButtonProps, makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from 'components/Theme'
import { useMutationForm } from 'components/useMutationForm'
import { SignOutDocument } from 'generated/apollo'

const useStyles = makeStyles(
  (theme: Theme) => ({
    error: {
      color: theme.palette.error.main,
    },
  }),
  { name: 'SignOut' },
)

type SignOutFormProps = UseStyles<typeof useStyles> &
  Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function SignOutForm(props: SignOutFormProps) {
  const classes = useStyles(props)
  const { onSubmit, result } = useMutationForm<GQLSignOutMutation, GQLSignOutMutationVariables>({
    mutation: SignOutDocument,
  })
  const { buttonProps = {}, ...formProps } = props

  return (
    <form onSubmit={onSubmit} noValidate {...formProps}>
      <Button {...buttonProps} type='submit' disabled={result.loading}>
        Sign out
      </Button>

      {!result.loading && result.error?.message && (
        <div className={classes.error}>{result.error?.message}</div>
      )}
    </form>
  )
}
