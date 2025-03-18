import {
  AttributesValueArray_to_CustomAttributesFormField,
  CustomAttributesField_to_AttributeValueInputs,
  useAttributesForm,
  type CustomAttributeMetadata,
  type CustomAttributesFormValues,
  type UseAttributesFormConfig,
} from '@graphcommerce/magento-store'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import type { OmitDeep } from 'type-fest'
import type { CustomerInfoFragment } from '../../hooks'
import {
  UpdateCustomerV2Document,
  type UpdateCustomerV2Mutation,
  type UpdateCustomerV2MutationVariables,
} from './UpdateCustomerV2.gql'

export type UpdateCustomerFormValues = OmitDeep<
  UpdateCustomerV2MutationVariables,
  | 'input.dob'
  | 'input.date_of_birth'
  | 'input.prefix'
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
): UpdateCustomerV2MutationVariables {
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

export function useCustomerUpdateForm({
  customer,
  customizeAttributes,
  exclude,
}: UseCustomerUpdateFormConfig) {
  const attributes = useAttributesForm({
    formCode: 'customer_account_edit',
    exclude: exclude || ['email'],
    typename: 'CustomerAttributeMetadata',
    customizeAttributes,
  })

  // console.log(customer, CustomerInfo_to_UpdateCustomerFormValues(attributes, customer))
  const form = useFormGqlMutation<UpdateCustomerV2Mutation, UpdateCustomerFormValues>(
    UpdateCustomerV2Document,
    {
      values: CustomerInfo_to_UpdateCustomerFormValues(attributes, customer),
      onBeforeSubmit: (values) =>
        UpdateCustomerFormValues_to_UpdateCustomerVariables(attributes, values),
    },
  )

  return { ...form, attributes }
}
