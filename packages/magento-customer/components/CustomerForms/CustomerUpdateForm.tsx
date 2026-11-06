import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import {
  AttributesFormAutoLayout,
  type AttributeFormAutoLayoutProps,
} from '@graphcommerce/magento-store'
import { Button, FormActions, type ButtonProps } from '@graphcommerce/next-ui'
import type { UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
import type { useMutation } from '@apollo/client/react'
import { Trans } from '@lingui/react/macro'
import { styled } from '@mui/material'
import type { ComponentProps } from 'react'
import { CustomerAttributeField } from './CustomerAttributeField'
import { nameFieldset } from './nameFieldset'
import {
  useCustomerUpdateForm,
  type UpdateCustomerFormValues,
  type UseCustomerUpdateFormConfig,
} from './useCustomerUpdateForm'
import type { UseCustomerUpdateFormMutation } from './UseCustomerUpdateForm.gql'

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
  useFormGqlOptions?: UseFormGraphQlOptions<UseCustomerUpdateFormMutation, UpdateCustomerFormValues>
  mutationOptions?: useMutation.Options<UseCustomerUpdateFormMutation, UpdateCustomerFormValues>
} & UseCustomerUpdateFormConfig

export function CustomerUpdateForm(props: CustomerUpdateFormProps) {
  const { slotProps, fieldsets, render, useFormGqlOptions, mutationOptions, ...config } = props

  const { control, handleSubmit, formState, error, attributes } = useCustomerUpdateForm(
    config,
    useFormGqlOptions,
    mutationOptions,
  )
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
          <Trans>Save changes</Trans>
        </Button>
      </FormActions>
      <ApolloErrorSnackbar error={error} />
    </Form>
  )
}
