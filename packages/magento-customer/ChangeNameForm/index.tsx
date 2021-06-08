import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormDivider from '@reachdigital/next-ui/Form/FormDivider'
import MessageSnackbar from '@reachdigital/next-ui/Snackbar/MessageSnackbar'
import React from 'react'
import { useFormGqlMutation } from '../../react-hook-form'
import NameFields from '../NameFields'
import { UpdateCustomerNameDocument } from '../UpdateCustomerName/UpdateCustomerName.gql'

type ChangeNameFormProps = {
  prefix?: string
  firstname: string
  lastname: string
}

export default function ChangeNameForm(props: ChangeNameFormProps) {
  const { prefix, firstname, lastname } = props
  const form = useFormGqlMutation(UpdateCustomerNameDocument, {
    defaultValues: {
      prefix: prefix ?? '',
      firstname: firstname ?? '',
      lastname: lastname ?? '',
    },
  })

  const { handleSubmit, error, formState } = form
  const submit = handleSubmit(() => {})

  return (
    <form onSubmit={submit} noValidate>
      <NameFields form={form} prefix />
      <FormDivider />
      <FormActions>
        <Button type='submit' text='bold' color='primary' variant='contained' size='large'>
          Save changes
        </Button>
      </FormActions>
      <ApolloErrorAlert error={error} />

      <MessageSnackbar open={formState.isSubmitSuccessful && !error}>
        <>Successfully saved changes</>
      </MessageSnackbar>
    </form>
  )
}
