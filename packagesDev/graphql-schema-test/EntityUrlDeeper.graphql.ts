import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import * as Types from '@reachdigital/magento-graphql'

export const EntityUrlDeeperFragmentDoc: DocumentNode<EntityUrlDeeperFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EntityUrlDeeper' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EntityUrl' } },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' }, arguments: [], directives: [] },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'relative_url' },
            arguments: [],
            directives: [],
          },
          { kind: 'Field', name: { kind: 'Name', value: 'type' }, arguments: [], directives: [] },
        ],
      },
    },
  ],
}
export type EntityUrlDeeperFragment = Pick<Types.EntityUrl, 'id' | 'relative_url' | 'type'>
