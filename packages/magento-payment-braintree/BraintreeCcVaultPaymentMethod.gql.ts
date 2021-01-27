// Do not edit this file: autogenerated by graphql-code-generator
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const BraintreeCcVaultPaymentMethodDocument: DocumentNode<
  BraintreeCcVaultPaymentMethodMutation,
  BraintreeCcVaultPaymentMethodMutationVariables
> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'BraintreeCcVaultPaymentMethod' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'deviceData' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'publicHash' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'poNr' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'setPaymentMethodOnCart' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'ObjectValue',
                  fields: [
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'cart_id' },
                      value: { kind: 'Variable', name: { kind: 'Name', value: 'cartId' } },
                    },
                    {
                      kind: 'ObjectField',
                      name: { kind: 'Name', value: 'payment_method' },
                      value: {
                        kind: 'ObjectValue',
                        fields: [
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'purchase_order_number' },
                            value: { kind: 'Variable', name: { kind: 'Name', value: 'poNr' } },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'code' },
                            value: {
                              kind: 'StringValue',
                              value: 'braintree_cc_vault',
                              block: false,
                            },
                          },
                          {
                            kind: 'ObjectField',
                            name: { kind: 'Name', value: 'braintree_cc_vault' },
                            value: {
                              kind: 'ObjectValue',
                              fields: [
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'device_data' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'deviceData' },
                                  },
                                },
                                {
                                  kind: 'ObjectField',
                                  name: { kind: 'Name', value: 'public_hash' },
                                  value: {
                                    kind: 'Variable',
                                    name: { kind: 'Name', value: 'publicHash' },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'cart' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'selected_payment_method' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: 'code' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
}
export type BraintreeCcVaultPaymentMethodMutationVariables = Types.Exact<{
  cartId: Types.Scalars['String']
  deviceData: Types.Scalars['String']
  publicHash: Types.Scalars['String']
  poNr?: Types.Maybe<Types.Scalars['String']>
}>

export type BraintreeCcVaultPaymentMethodMutation = {
  setPaymentMethodOnCart?: Types.Maybe<{
    cart: {
      selected_payment_method?: Types.Maybe<Pick<Types.SelectedPaymentMethod, 'code' | 'title'>>
    }
  }>
}
