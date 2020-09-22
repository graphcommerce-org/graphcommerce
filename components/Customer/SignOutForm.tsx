import { Button, FormControl, FormHelperText } from '@material-ui/core'
import { useMutationForm } from 'components/useMutationForm'
import { SignOutDocument } from 'generated/apollo'

type SignOutFormProps = Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function SignOutForm(props: SignOutFormProps) {
  const { onSubmit, result } = useMutationForm<GQLSignOutMutation, GQLSignOutMutationVariables>({
    mutation: SignOutDocument,
  })
  const { ...formProps } = props

  return (
    <form onSubmit={onSubmit} noValidate {...formProps}>
      <FormControl>
        <Button type='submit' disabled={result.loading} variant='outlined'>
          Sign out
        </Button>
        <FormHelperText error={!!result.error?.message}>{result.error?.message}</FormHelperText>
      </FormControl>
    </form>
  )
}
