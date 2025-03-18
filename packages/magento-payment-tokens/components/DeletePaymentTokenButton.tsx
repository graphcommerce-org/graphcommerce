import { ApolloErrorSnackbar, useFormGqlMutation } from '@graphcommerce/ecommerce-ui'
import { iconBin } from '@graphcommerce/next-ui'
import { type SxProps, type Theme } from '@mui/material'
import { DeletePaymentTokenDocument } from '../graphql/mutations/DeletePaymentToken.gql'

export function DeletePaymentTokenButton(props: { sx: SxProps<Theme> }) {
  const { sx } = props
  const { handleSubmit, formState, error } = useFormGqlMutation(DeletePaymentTokenDocument)

  const submit = handleSubmit(() => {})

  return (
    <form onSubmit={submit}>
      <Fab
        type='submit'
        aria-label='Delete'
        color='error'
        loading={formState.isSubmitting}
        icon={iconBin}
        sx={sx}
      />
      <ApolloErrorSnackbar error={error} />
    </form>
  )
}
