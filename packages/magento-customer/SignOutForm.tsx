import { Button, FormControl, FormHelperText } from '@material-ui/core'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import { useRouter } from 'next/router'
import { SignOutDocument } from './SignOut.graphql'

type SignOutFormProps = Omit<JSX.IntrinsicElements['form'], 'onSubmit' | 'noValidate'>

export default function SignOutForm(props: SignOutFormProps) {
  const router = useRouter()
  const { onSubmit, loading, error } = useMutationForm({
    mutation: SignOutDocument,
    onComplete: () => router.back(),
  })

  return (
    <form onSubmit={onSubmit} noValidate {...props}>
      <FormControl>
        <Button type='submit' disabled={loading} color='primary'>
          Sign out
        </Button>
        <FormHelperText error={!!error?.message}>{error?.message}</FormHelperText>
      </FormControl>
    </form>
  )
}
