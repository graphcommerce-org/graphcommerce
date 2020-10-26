import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

import { EntityUrlFragment, EntityUrlFragmentDoc } from './EntityUrl.graphql'

export const ResolveUrlDocument: DocumentNode<ResolveUrlQuery, ResolveUrlQueryVariables> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'ResolveUrl' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'urlKey' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
          },
          directives: [],
        },
      ],
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'urlResolver' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'url' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'urlKey' } },
              },
            ],
            directives: [],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'EntityUrl' },
                  directives: [],
                },
              ],
            },
          },
        ],
      },
    },
    ...EntityUrlFragmentDoc.definitions,
  ],
}
export type ResolveUrlQueryVariables = Types.Exact<{
  urlKey: Types.Scalars['String']
}>

export type ResolveUrlQuery = { urlResolver?: Types.Maybe<EntityUrlFragment> }
