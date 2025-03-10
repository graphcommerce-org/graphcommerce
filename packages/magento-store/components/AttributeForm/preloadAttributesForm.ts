import type { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { AttributesFormDocument } from '../../graphql'
import type { CustomAttributeFormCode } from './useAttributesForm'

export function preloadAttributesForm(
  client: ApolloClient<NormalizedCacheObject>,
  formCode: CustomAttributeFormCode,
) {
  return client.query({ query: AttributesFormDocument, variables: { formCode } })
}
