import { EntityUrlDeeperFragment } from './EntityUrlDeeper.graphql'
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import { EntityUrlDeeperFragmentDoc } from './EntityUrlDeeper.graphql'
export const EntityUrlFragmentDoc: DocumentNode<EntityUrlFragment, unknown> = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'EntityUrl' },
      typeCondition: { kind: 'NamedType', name: { kind: 'Name', value: 'EntityUrl' } },
      directives: [],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'FragmentSpread',
            name: { kind: 'Name', value: 'EntityUrlDeeper' },
            directives: [],
          },
        ],
      },
    },
    ...EntityUrlDeeperFragmentDoc.definitions,
  ],
}
export type EntityUrlFragment = EntityUrlDeeperFragment
