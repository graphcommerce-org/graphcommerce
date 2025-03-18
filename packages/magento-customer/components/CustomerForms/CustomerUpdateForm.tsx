import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import {
  AttributesFormAutoLayout,
  type AttributeFormAutoLayoutProps,
} from '@graphcommerce/magento-store'
import { extractAttributes } from '@graphcommerce/magento-store/components/AttributeForm/useAttributesForm'
import { Button, FormActions, type ButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { styled } from '@mui/material'
import type { ComponentProps } from 'react'
import { CustomerAttributeField } from '../CustomerAttributesForm/CustomerAttributeField'
import { nameFieldset } from './nameFieldset'
import {
  useCustomerUpdateForm,
  type UpdateCustomerFormValues,
  type UseCustomerUpdateFormConfig,
} from './useCustomerUpdateForm'

const Form = styled('form')({})

export type CustomerUpdateFormProps = Pick<
  AttributeFormAutoLayoutProps<UpdateCustomerFormValues, 'CustomerAttributeMetadata'>,
  'fieldsets' | 'render'
> & {
  slotProps?: {
    form: Omit<ComponentProps<typeof Form>, 'onSubmit' | 'noValidate'>
    formLayout?: Omit<
      AttributeFormAutoLayoutProps<UpdateCustomerFormValues, 'CustomerAttributeMetadata'>,
      'control' | 'attributes'
    >
    formActions?: ComponentProps<typeof FormActions>
    button?: Omit<ButtonProps, 'type' | 'loading'>
  }
} & UseCustomerUpdateFormConfig

export function CustomerUpdateForm(props: CustomerUpdateFormProps) {
  const { slotProps, fieldsets, render, ...config } = props

  const { control, handleSubmit, formState, error, attributes } = useCustomerUpdateForm(config)
  const submit = handleSubmit(() => {})

  // TODO: Hoe render ik iets als Street die een custom renderer nodig heeft, custom placeholders, etc. Component aanpassen.
  // TODO: Vertalingen zijn op dit moment niet altijd juist, hoe kan ik props aanpassen zodat deze wel werken? Props aanpassen.
  // TODO: Customer account create: Ook de mogelijkheid tot het toevoegen van een adres bij registratie.

  return (
    <Form onSubmit={submit} noValidate {...slotProps?.form}>
      <AttributesFormAutoLayout
        attributes={attributes}
        control={control}
        render={render ?? CustomerAttributeField}
        fieldsets={fieldsets ?? [nameFieldset(attributes)]}
        {...slotProps?.formLayout}
      />
      <FormActions {...slotProps?.formActions}>
        <Button
          type='submit'
          color='primary'
          variant='pill'
          size='large'
          loading={formState.isSubmitting}
          {...slotProps?.button}
        >
          <Trans id='Save changes' />
        </Button>
      </FormActions>
      <ApolloErrorSnackbar error={error} />
    </Form>
  )
}
