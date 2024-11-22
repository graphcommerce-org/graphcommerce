// eslint-disable-next-line import/no-extraneous-dependencies
import type { Types } from '@graphql-codegen/plugin-helpers'
import '@graphql-codegen/testing'
import type { ASTNode } from 'graphql'
import { Kind, buildSchema, parse, print } from 'graphql'
import { plugin } from '../../src'

const testSchema = buildSchema(/* GraphQL */ `
  type Avatar {
    id: ID!
    url: String!
  }

  type User {
    id: ID!
    login: String!
    avatar(height: Int!, width: Int!): Avatar
  }

  type Query {
    user: User!
    users: [User!]!
  }
`)

it('can be called', async () => {
  const testDocument = parse(/* GraphQL */ `
    query user {
      user {
        id
      }
    }
  `)
  await plugin(testSchema, [{ document: testDocument }], {})
})

it('can be called with queries that include connection fragments', async () => {
  const testDocument = parse(/* GraphQL */ `
    query user {
      users @connection(key: "foo") {
        id
      }
    }
  `)
  await plugin(testSchema, [{ document: testDocument }], {})
})

it('can inline @argumentDefinitions/@arguments annotated fragments', async () => {
  const fragmentDocument = parse(/* GraphQL */ `
    fragment UserLogin on User
    @argumentDefinitions(
      height: { type: "Int", defaultValue: 10 }
      width: { type: "Int", defaultValue: 10 }
    ) {
      id
      login
      avatar(width: $width, height: $height) {
        id
        url
      }
    }
  `)
  const queryDocument = parse(/* GraphQL */ `
    query user {
      users {
        ...UserLogin @arguments(height: 30, width: 30)
      }
    }
  `)
  const input: Types.DocumentFile[] = [{ document: fragmentDocument }, { document: queryDocument }]
  await plugin(testSchema, input, {})
  const queryDoc = input.find(
    (doc) => doc.document?.definitions[0].kind === Kind.OPERATION_DEFINITION,
  )

  expect(queryDoc).toBeDefined()
  expect(print(queryDoc?.document as ASTNode)).toBeSimilarStringTo(/* GraphQL */ `
    query user {
      users {
        id
        login
        avatar(width: 30, height: 30) {
          id
          url
        }
      }
    }
  `)
})

it('handles unions with interfaces the correct way', async () => {
  const schema = buildSchema(/* GraphQL */ `
    type User {
      id: ID!
      login: String!
    }

    interface Error {
      message: String!
    }

    type UserNotFoundError implements Error {
      message: String!
    }

    type UserBlockedError implements Error {
      message: String!
    }

    union UserResult = User | UserNotFoundError | UserBlockedError

    type Query {
      user: UserResult!
    }
  `)

  const queryDocument = parse(/* GraphQL */ `
    query user {
      user {
        ... on User {
          id
          login
        }
        ... on Error {
          message
        }
      }
    }
  `)

  const input: Types.DocumentFile[] = [{ document: queryDocument }]
  await plugin(schema, input, {})
  const queryDoc = input.find(
    (doc) => doc.document?.definitions[0].kind === Kind.OPERATION_DEFINITION,
  )

  expect(queryDoc).toBeDefined()
  expect(print(queryDoc?.document as ASTNode)).toBeSimilarStringTo(/* GraphQL */ `
    query user {
      user {
        ... on User {
          id
          login
        }
        ... on Error {
          message
        }
      }
    }
  `)
})
