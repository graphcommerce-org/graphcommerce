import { Button, FormControl, FormHelperText } from '@material-ui/core'
import { useMutationForm } from 'components/useMutationForm'
import { SignOutDocument } from 'generated/documents'
import { useRouter } from 'next/router'

type SignOutFormProps = Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function SignOutForm(props: SignOutFormProps) {
  const router = useRouter()
  const { onSubmit, loading, error } = useMutationForm<
    GQLSignOutMutation,
    GQLSignOutMutationVariables
  >({ mutation: SignOutDocument, onComplete: () => router.back() })

  return (
    <form onSubmit={onSubmit} noValidate {...props}>
      <FormControl>
        <Button type='submit' disabled={loading} variant='outlined'>
          Sign out
        </Button>
        <FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
      </FormControl>
    </form>
  )
}
