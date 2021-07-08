import { Button, Form, FormActions, FormDivider, MessageSnackbar } from '@reachdigital/next-ui'

import React from 'react'
import { useFormGqlMutation } from '../../react-hook-form'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import NameFields from '../NameFields'
import { UpdateCustomerNameDocument } from '../UpdateCustomerName/UpdateCustomerName.gql'

type ChangeNameFormProps = {
  prefix?: string
  firstname: string
  lastname: string
}

export default function ChangeNameForm(props: ChangeNameFormProps) {
  const { prefix, firstname, lastname } = props
  const form = useFormGqlMutation(
    UpdateCustomerNameDocument,
    {
      defaultValues: {
        prefix: prefix ?? '',
        firstname: firstname ?? '',
        lastname: lastname ?? '',
      },
    },
    { errorPolicy: 'all' },
  )

  const { handleSubmit, error, formState } = form
  const submit = handleSubmit(() => {})

  return (
    <Form onSubmit={submit} noValidate>
      <NameFields form={form} prefix />
      <FormDivider />
      <FormActions>
        <Button
          type='submit'
          text='bold'
          color='primary'
          variant='contained'
          size='large'
          loading={formState.isSubmitting}
        >
          Save changes
        </Button>
      </FormActions>
      <ApolloCustomerErrorAlert error={error} />

      <MessageSnackbar sticky open={formState.isSubmitSuccessful && !error}>
        <>Successfully saved changes</>
      </MessageSnackbar>
    </Form>
  )
}
