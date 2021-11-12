import {
  Button,
  Form,
  FormActions,
  FormDivider,
  MessageSnackbar,
  iconCheckmark,
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import React from 'react'
import ApolloCustomerErrorAlert from '../ApolloCustomerError/ApolloCustomerErrorAlert'
import NameFields from '../NameFields'
import { UpdateCustomerNameDocument } from './UpdateCustomerName.gql'

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
    <>
      <Form onSubmit={submit} noValidate>
        <NameFields form={form} prefix />
        <FormDivider />
        <FormActions>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            size='large'
            loading={formState.isSubmitting}
          >
            Save changes
          </Button>
        </FormActions>
        <ApolloCustomerErrorAlert error={error} />
      </Form>
      <MessageSnackbar open={formState.isSubmitSuccessful && !error} variant='pill'>
        <>Successfully saved changes</>
      </MessageSnackbar>
    </>
  )
}
