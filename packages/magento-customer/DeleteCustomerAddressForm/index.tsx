import { Button, makeStyles, Theme } from '@material-ui/core'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { useFormGqlMutation } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { DeleteCustomerAddressFormDocument } from './DeleteCustomerAddressForm.gql'

export type DeleteCustomerAddressFormProps = {
  addressId?: number
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    display: 'block',
    margin: `0 auto ${theme.spacings.sm} auto`,
  },
}))

export default function DeleteCustomerAddressForm(props: DeleteCustomerAddressFormProps) {
  const { addressId } = props
  const router = useRouter()
  const classes = useStyles()
  const { handleSubmit, error } = useFormGqlMutation(DeleteCustomerAddressFormDocument, {
    defaultValues: {
      id: addressId,
    },
    onComplete: () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push({ pathname: '/account/addresses', query: 'confirm_delete' })
    },
  })
  const submitHandler = handleSubmit(() => {})

  return (
    <form onSubmit={submitHandler} noValidate>
      <Button type='submit' variant='text' color='primary' className={classes.button}>
        Delete this address
      </Button>
      <ApolloErrorAlert error={error} />
    </form>
  )
}
