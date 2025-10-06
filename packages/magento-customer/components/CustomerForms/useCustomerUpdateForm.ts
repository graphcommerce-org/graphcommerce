import {
  AttributesValueArray_to_CustomAttributesFormField,
  CustomAttributesField_to_AttributeValueInputs,
  useAttributesForm,
  type CustomAttributeMetadata,
  type CustomAttributesFormValues,
  type UseAttributesFormConfig,
} from '@graphcommerce/magento-store'
import { useFormGqlMutation, type UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
import type { MutationHookOptions } from '@apollo/client'
import type { OmitDeep } from 'type-fest'
import type { CustomerInfoFragment } from '../../hooks'
import {
  UseCustomerUpdateFormDocument,
  type UseCustomerUpdateFormMutation,
  type UseCustomerUpdateFormMutationVariables,
} from './UseCustomerUpdateForm.gql'

export type UpdateCustomerFormValues = OmitDeep<
  UseCustomerUpdateFormMutationVariables,
  | 'input.dob'
  | 'input.date_of_birth'
  | 'input.prefix'
  | 'input.middlename'
  | 'input.firstname'
  | 'input.lastname'
  | 'input.suffix'
  | 'input.gender'
> &
  CustomAttributesFormValues<
    Record<
      'dob' | 'prefix' | 'firstname' | 'middlename' | 'lastname' | 'suffix' | 'gender',
      string | undefined
    >
  >

/** Used for values prop of useFormGqlMutation */
export function CustomerInfo_to_UpdateCustomerFormValues(
  attributes: CustomAttributeMetadata<'CustomerAttributeMetadata'>[],
  customer: CustomerInfoFragment,
): UpdateCustomerFormValues {
  const { date_of_birth, prefix, firstname, middlename, lastname, suffix, gender } = customer

  return {
    input: {},
    custom_attributes: {
      ...AttributesValueArray_to_CustomAttributesFormField(attributes, customer.custom_attributes),
      dob: date_of_birth ?? undefined,
      prefix: prefix ?? undefined,
      firstname: firstname ?? undefined,
      middlename: middlename ?? undefined,
      lastname: lastname ?? undefined,
      suffix: suffix ?? undefined,
      gender: gender ? String(gender) : undefined,
    },
  }
}

/** SUsed for onBeforeSubmit of useFormGqlMutation */
export function UpdateCustomerFormValues_to_UpdateCustomerVariables(
  attributes: CustomAttributeMetadata<'CustomerAttributeMetadata'>[],
  values: UpdateCustomerFormValues,
): UseCustomerUpdateFormMutationVariables {
  const { dob, firstname, middlename, gender, lastname, prefix, suffix, ...custom_attributes } =
    values.custom_attributes ?? {}

  return {
    input: {
      ...values.input,
      firstname,
      middlename,
      lastname,
      prefix,
      suffix,
      date_of_birth: dob,
      gender: gender ? Number(gender) : undefined,
      custom_attributes: [
        ...(values.input.custom_attributes ?? []),
        ...CustomAttributesField_to_AttributeValueInputs(attributes, custom_attributes),
      ],
    },
  }
}

export type UseCustomerUpdateFormConfig = { customer: CustomerInfoFragment } & Omit<
  UseAttributesFormConfig<'CustomerAttributeMetadata'>,
  'formCode' | 'typename'
>

export function useCustomerUpdateForm(
  config: UseCustomerUpdateFormConfig,
  useFormGqlOptions?: UseFormGraphQlOptions<
    UseCustomerUpdateFormMutation,
    UpdateCustomerFormValues
  >,
  mutationOptions?: MutationHookOptions<UseCustomerUpdateFormMutation, UpdateCustomerFormValues>,
) {
  const { customer, ...attributeFormConfig } = config
  const attributes = useAttributesForm({
    formCode: 'customer_account_edit',
    exclude: ['email'],
    typename: 'CustomerAttributeMetadata',
    ...attributeFormConfig,
  })

  // console.log(customer, CustomerInfo_to_UpdateCustomerFormValues(attributes, customer))
  const form = useFormGqlMutation<UseCustomerUpdateFormMutation, UpdateCustomerFormValues>(
    UseCustomerUpdateFormDocument,
    {
      values: CustomerInfo_to_UpdateCustomerFormValues(attributes, customer),
      onBeforeSubmit: async (values, f) => {
        const result = (await useFormGqlOptions?.onBeforeSubmit?.(values, f)) ?? values
        if (result === false) return false
        return UpdateCustomerFormValues_to_UpdateCustomerVariables(attributes, values)
      },
      ...useFormGqlOptions,
    },
    mutationOptions,
  )

  return { ...form, attributes }
}
