import type { CustomerUpdateInput } from '@graphcommerce/graphql-mesh'
import {
  AttributesValueArray_to_CustomAttributesFormField,
  CustomAttributesField_to_AttributeValueInputs,
  type CustomAttributeMetadata,
  type CustomAttributesFormValues,
} from '@graphcommerce/magento-store/components/AttributeForm/useAttributesForm'
import type { OmitDeep } from 'type-fest'
import type { CustomerInfoFragment } from '../../hooks/CustomerInfo.gql'
import type { UpdateCustomerV2MutationVariables } from './UpdateCustomerV2.gql'

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
  attributes: CustomAttributeMetadata[],
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
  attributes: CustomAttributeMetadata[],
  values: UpdateCustomerFormValues,
): { input: CustomerUpdateInput } {
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
