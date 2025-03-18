import { AttributesFormAutoLayout } from '@graphcommerce/magento-store'
import { extractAttributes } from '@graphcommerce/magento-store/components/AttributeForm/useAttributesForm'
import { Button, FormActions } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import type { CustomerInfoFragment } from '../../hooks/CustomerInfo.gql'
import { ApolloCustomerErrorAlert } from '../ApolloCustomerError'
import { useCustomerUpdateForm } from './useCustomerUpdateForm'

export function CustomerUpdateForm(props: { customer: CustomerInfoFragment }) {
  const { customer } = props

  const { control, handleSubmit, formState, error, attributes } = useCustomerUpdateForm(customer)
  const submit = handleSubmit(() => {})

  // TODO: Hoe render ik iets als Street die een custom renderer nodig heeft, custom placeholders, etc. Component aanpassen.
  // TODO: Vertalingen zijn op dit moment niet altijd juist, hoe kan ik props aanpassen zodat deze wel werken? Props aanpassen.
  // TODO: Customer account create: Ook de mogelijkheid tot het toevoegen van een adres bij registratie.
  const [nameFields] = extractAttributes(attributes, ['firstname', 'middlename', 'lastname'])

  return (
    <form onSubmit={submit} noValidate>
      <AttributesFormAutoLayout
        attributes={attributes}
        control={control}
        fieldsets={[
          {
            label: <Trans id='Name' />,
            attributes: nameFields.map((f) => f.code),
            sx: {
              gridTemplateAreas: {
                // xs is shown in one column by default
                md: `"${nameFields.map((f) => f.code).join(' ')}"`,
              },
            },
          },
        ]}
      />

      <FormActions>
        <Button
          type='submit'
          color='primary'
          variant='pill'
          size='large'
          loading={formState.isSubmitting}
        >
          <Trans id='Save changes' />
        </Button>
      </FormActions>
      <ApolloCustomerErrorAlert error={error} />
    </form>
  )
}
