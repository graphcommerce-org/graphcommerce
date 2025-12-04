import { ApolloErrorSnackbar, useFormGqlMutation } from '@graphcommerce/ecommerce-ui'
import { Fab, iconBin, sxx } from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { type SxProps, type Theme } from '@mui/material'
import { DeletePaymentTokenDocument } from '../graphql/mutations/DeletePaymentToken.gql'

export function DeletePaymentTokenButton(props: { sx: SxProps<Theme>; publicHash: string }) {
  const { sx, publicHash } = props

  const { handleSubmit, formState, error } = useFormGqlMutation(DeletePaymentTokenDocument, {
    values: { publicHash },
  })

  const submit = handleSubmit(() => {})

  return (
    <form onSubmit={submit}>
      <Fab
        type='submit'
        aria-label={t`Remove`}
        loading={formState.isSubmitting}
        icon={iconBin}
        sx={sxx({ boxShadow: 0 }, sx)}
      />
      <ApolloErrorSnackbar error={error} />
    </form>
  )
}
