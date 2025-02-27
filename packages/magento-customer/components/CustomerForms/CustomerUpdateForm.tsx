import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import {
  AttributesFormAutoLayout,
  type AttributeFormAutoLayoutProps,
} from '@graphcommerce/magento-store'
import { Button, FormActions, type ButtonProps } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { styled } from '@mui/material'
import type { ComponentProps } from 'react'
import { CustomerAttributeField } from './CustomerAttributeField'
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
