"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const __1 = require("..");
const testSchema = (0, graphql_1.buildSchema)(/* GraphQL */ `
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
`);
it('can be called', async () => {
    const testDocument = (0, graphql_1.parse)(/* GraphQL */ `
    query user {
      user {
        id
      }
    }
  `);
    await (0, __1.plugin)(testSchema, [{ document: testDocument }], {});
});
it('can be called with queries that include connection fragments', async () => {
    const testDocument = (0, graphql_1.parse)(/* GraphQL */ `
    query user {
      users @connection(key: "foo") {
        id
      }
    }
  `);
    await (0, __1.plugin)(testSchema, [{ document: testDocument }], {});
});
it('can inline @argumentDefinitions/@arguments annotated fragments', async () => {
    const fragmentDocument = (0, graphql_1.parse)(/* GraphQL */ `
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
  `);
    const queryDocument = (0, graphql_1.parse)(/* GraphQL */ `
    query user {
      users {
        ...UserLogin @arguments(height: 30, width: 30)
      }
    }
  `);
    const input = [{ document: fragmentDocument }, { document: queryDocument }];
    await (0, __1.plugin)(testSchema, input, {});
    const queryDoc = input.find((doc) => doc.document?.definitions[0].kind === 'OperationDefinition');
    expect(queryDoc).toBeDefined();
    expect((0, graphql_1.print)(queryDoc?.document)).toBeSimilarStringTo(/* GraphQL */ `
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
  `);
});
it('handles unions with interfaces the correct way', async () => {
    const schema = (0, graphql_1.buildSchema)(/* GraphQL */ `
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
  `);
    const queryDocument = (0, graphql_1.parse)(/* GraphQL */ `
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
  `);
    const input = [{ document: queryDocument }];
    await (0, __1.plugin)(schema, input, {});
    const queryDoc = input.find((doc) => doc.document?.definitions[0].kind === 'OperationDefinition');
    expect(queryDoc).toBeDefined();
    expect((0, graphql_1.print)(queryDoc?.document)).toBeSimilarStringTo(/* GraphQL */ `
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
  `);
});
