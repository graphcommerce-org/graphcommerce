// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import {
  CartAddress_BillingCartAddress_Fragment,
  CartAddress_ShippingCartAddress_Fragment,
  CartAddressFragmentDoc,
} from '../cart-address/CartAddress.gql'

export const BillingCartAddressFragmentDoc: DocumentNode<BillingCartAddressFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'BillingCartAddress' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'BillingCartAddress' } },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'FragmentSpread', name: { kind: 'Name', value: 'CartAddress' } }],
      },
    },
    ...CartAddressFragmentDoc.definitions,
  ],
}
export type BillingCartAddressFragment = CartAddress_BillingCartAddress_Fragment
