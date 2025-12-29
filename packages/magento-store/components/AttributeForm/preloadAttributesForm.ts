import type { ApolloClient } from '@graphcommerce/graphql'
import { AttributesFormDocument } from '../../graphql'
import type { CustomAttributeFormCode } from './useAttributesForm'

export function preloadAttributesForm(client: ApolloClient, formCode: CustomAttributeFormCode) {
  return client.query({ query: AttributesFormDocument, variables: { formCode } })
}
