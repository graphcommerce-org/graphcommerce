import {
  CustomAttributesField_to_AttributeValueInputs,
  useAttributesForm,
  type CustomAttributeMetadata,
  type CustomAttributesFormValues,
  type UseAttributesFormConfig,
} from '@graphcommerce/magento-store'
import { useFormGqlMutation, type UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
import type { useMutation } from '@apollo/client/react'
import {
  UseCustomerCreateFormDocument,
  type UseCustomerCreateFormMutation,
  type UseCustomerCreateFormMutationVariables,
} from './UseCustomerCreateForm.gql'

export type CreateCustomerFormValues = UseCustomerCreateFormMutationVariables &
  CustomAttributesFormValues & { confirmPassword?: string }

/** Used for onBeforeSubmit of useFormGqlMutation */
export function CreateCustomerFormValues_to_CreateCustomerVariables(
  attributes: CustomAttributeMetadata<'CustomerAttributeMetadata'>[],
  values: CreateCustomerFormValues,
): UseCustomerCreateFormMutationVariables {
  const { ...custom_attributes } = values.custom_attributes ?? {}

  return {
    input: {
      ...values.input,
      gender: values.input.gender ? Number(values.input.gender) : undefined,
      custom_attributes: [
        ...(values.input.custom_attributes ?? []),
        ...CustomAttributesField_to_AttributeValueInputs(attributes, custom_attributes),
      ],
    },
  }
}

export type UseCustomerCreateFormConfig = Omit<
  UseAttributesFormConfig<'CustomerAttributeMetadata'>,
  'formCode' | 'typename'
>

export function useCustomerCreateForm(
  attributeFormConfig?: UseCustomerCreateFormConfig,
  useFormGqlOptions?: UseFormGraphQlOptions<
    UseCustomerCreateFormMutation,
    CreateCustomerFormValues
  >,
  mutationOptions?: useMutation.Options<UseCustomerCreateFormMutation, CreateCustomerFormValues>,
) {
  const attributes = useAttributesForm({
    formCode: 'customer_account_create',
    typename: 'CustomerAttributeMetadata',
    attributeToName: {
      email: 'input.email',
      dob: 'input.date_of_birth',
      firstname: 'input.firstname',
      lastname: 'input.lastname',
      prefix: 'input.prefix',
      middlename: 'input.middlename',
      suffix: 'input.suffix',
      gender: 'input.gender',
      password: 'input.password',
    },
    ...attributeFormConfig,
  })

  // console.log(customer, CustomerInfo_to_UpdateCustomerFormValues(attributes, customer))
  const form = useFormGqlMutation<UseCustomerCreateFormMutation, CreateCustomerFormValues>(
    UseCustomerCreateFormDocument,
    {
      ...useFormGqlOptions,
      onBeforeSubmit: async (values, f) => {
        const result = (await useFormGqlOptions?.onBeforeSubmit?.(values, f)) ?? values
        if (result === false) return false
        return CreateCustomerFormValues_to_CreateCustomerVariables(attributes, result)
      },
    },
    mutationOptions,
  )

  return { ...form, attributes }
}
