import { useAttributesForm } from '@graphcommerce/magento-store'
import { useFormGqlMutation } from '@graphcommerce/react-hook-form'
import { UpdateCustomerV2Document, type UpdateCustomerV2Mutation } from './UpdateCustomerV2.gql'
import {
  CustomerInfo_to_UpdateCustomerFormValues,
  UpdateCustomerFormValues_to_UpdateCustomerVariables,
  type UpdateCustomerFormValues,
} from './utils'

export function useCustomerUpdateForm() {
  const attributes = useAttributesForm({
    formCode: 'customer_account_edit',
    exclude: ['email'],
  })

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
