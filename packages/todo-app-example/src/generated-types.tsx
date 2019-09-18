import gql from "graphql-tag";
import * as ApolloReactCommon from "@apollo/react-common";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddTodoInput = {
  text: Scalars["String"];
  userId: Scalars["ID"];
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type AddTodoPayload = {
  __typename?: "AddTodoPayload";
  todoEdge: TodoEdge;
  user: User;
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type ChangeTodoStatusInput = {
  complete: Scalars["Boolean"];
  id: Scalars["ID"];
  userId: Scalars["ID"];
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type ChangeTodoStatusPayload = {
  __typename?: "ChangeTodoStatusPayload";
  todo: Todo;
  user: User;
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type MarkAllTodosInput = {
  complete: Scalars["Boolean"];
  userId: Scalars["ID"];
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type MarkAllTodosPayload = {
  __typename?: "MarkAllTodosPayload";
  changedTodos?: Maybe<Array<Todo>>;
  user: User;
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  addTodo?: Maybe<AddTodoPayload>;
  changeTodoStatus?: Maybe<ChangeTodoStatusPayload>;
  markAllTodos?: Maybe<MarkAllTodosPayload>;
  removeCompletedTodos?: Maybe<RemoveCompletedTodosPayload>;
  removeTodo?: Maybe<RemoveTodoPayload>;
  renameTodo?: Maybe<RenameTodoPayload>;
};

export type MutationAddTodoArgs = {
  input: AddTodoInput;
};

export type MutationChangeTodoStatusArgs = {
  input: ChangeTodoStatusInput;
};

export type MutationMarkAllTodosArgs = {
  input: MarkAllTodosInput;
};

export type MutationRemoveCompletedTodosArgs = {
  input: RemoveCompletedTodosInput;
};

export type MutationRemoveTodoArgs = {
  input: RemoveTodoInput;
};

export type MutationRenameTodoArgs = {
  input: RenameTodoInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars["ID"];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]>;
};

export type Query = {
  __typename?: "Query";
  user?: Maybe<User>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
};

export type QueryUserArgs = {
  id?: Maybe<Scalars["String"]>;
};

export type QueryNodeArgs = {
  id: Scalars["ID"];
};

export type RemoveCompletedTodosInput = {
  userId: Scalars["ID"];
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type RemoveCompletedTodosPayload = {
  __typename?: "RemoveCompletedTodosPayload";
  deletedTodoIds?: Maybe<Array<Scalars["String"]>>;
  user: User;
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type RemoveTodoInput = {
  id: Scalars["ID"];
  userId: Scalars["ID"];
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type RemoveTodoPayload = {
  __typename?: "RemoveTodoPayload";
  deletedTodoId: Scalars["ID"];
  user: User;
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type RenameTodoInput = {
  id: Scalars["ID"];
  text: Scalars["String"];
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type RenameTodoPayload = {
  __typename?: "RenameTodoPayload";
  todo: Todo;
  clientMutationId?: Maybe<Scalars["String"]>;
};

export type Todo = Node & {
  __typename?: "Todo";
  /** The ID of an object */
  id: Scalars["ID"];
  text: Scalars["String"];
  complete: Scalars["Boolean"];
};

/** A connection to a list of items. */
export type TodoConnection = {
  __typename?: "TodoConnection";
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TodoEdge>>>;
};

/** An edge in a connection. */
export type TodoEdge = {
  __typename?: "TodoEdge";
  /** The item at the end of the edge */
  node?: Maybe<Todo>;
  /** A cursor for use in pagination */
  cursor: Scalars["String"];
};

export type User = Node & {
  __typename?: "User";
  /** The ID of an object */
  id: Scalars["ID"];
  userId: Scalars["String"];
  todos?: Maybe<TodoConnection>;
  totalCount: Scalars["Int"];
  completedCount: Scalars["Int"];
};

export type UserTodosArgs = {
  status?: Maybe<Scalars["String"]>;
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
};
export type TodoApp_UserFragment = ({ __typename?: "User" } & Pick<
  User,
  "id" | "userId" | "totalCount"
>) &
  TodoListFooter_UserFragment &
  TodoList_UserFragment;

export type TodoListFooter_UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "userId" | "completedCount" | "totalCount"
> & {
    todos: Maybe<
      { __typename?: "TodoConnection" } & {
        edges: Maybe<
          Array<
            Maybe<
              { __typename?: "TodoEdge" } & {
                node: Maybe<
                  { __typename?: "Todo" } & Pick<Todo, "id" | "complete">
                >;
              }
            >
          >
        >;
      }
    >;
  };

export type TodoList_UserFragment = ({ __typename?: "User" } & Pick<
  User,
  "id" | "userId" | "totalCount" | "completedCount"
> & {
    todos: Maybe<
      { __typename?: "TodoConnection" } & {
        edges: Maybe<
          Array<
            Maybe<
              { __typename?: "TodoEdge" } & {
                node: Maybe<
                  ({ __typename?: "Todo" } & Pick<Todo, "id" | "complete">) &
                    Todo_TodoFragment
                >;
              }
            >
          >
        >;
      }
    >;
  }) &
  Todo_UserFragment;

export type Todo_TodoFragment = { __typename?: "Todo" } & Pick<
  Todo,
  "complete" | "id" | "text"
>;

export type Todo_UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "userId" | "totalCount" | "completedCount"
>;

export type AppQueryQueryVariables = {
  userId?: Maybe<Scalars["String"]>;
};

export type AppQueryQuery = { __typename?: "Query" } & {
  user: Maybe<
    { __typename?: "User" } & Pick<
      User,
      "id" | "userId" | "totalCount" | "completedCount"
    > & {
        todos: Maybe<
          { __typename?: "TodoConnection" } & {
            edges: Maybe<
              Array<
                Maybe<
                  { __typename?: "TodoEdge" } & {
                    node: Maybe<
                      { __typename?: "Todo" } & Pick<
                        Todo,
                        "id" | "complete" | "text"
                      >
                    >;
                  }
                >
              >
            >;
          }
        >;
      }
  >;
};

export type AddTodoMutationMutationVariables = {
  input: AddTodoInput;
};

export type AddTodoMutationMutation = { __typename?: "Mutation" } & {
  addTodo: Maybe<
    { __typename?: "AddTodoPayload" } & {
      todoEdge: { __typename: "TodoEdge" } & Pick<TodoEdge, "cursor"> & {
          node: Maybe<
            { __typename?: "Todo" } & Pick<Todo, "complete" | "id" | "text">
          >;
        };
      user: { __typename?: "User" } & Pick<User, "id" | "totalCount">;
    }
  >;
};

export type ChangeTodoStatusMutationMutationVariables = {
  input: ChangeTodoStatusInput;
};

export type ChangeTodoStatusMutationMutation = { __typename?: "Mutation" } & {
  changeTodoStatus: Maybe<
    { __typename?: "ChangeTodoStatusPayload" } & {
      todo: { __typename?: "Todo" } & Pick<Todo, "id" | "complete">;
      user: { __typename?: "User" } & Pick<User, "id" | "completedCount">;
    }
  >;
};

export type MarkAllTodosMutationMutationVariables = {
  input: MarkAllTodosInput;
};

export type MarkAllTodosMutationMutation = { __typename?: "Mutation" } & {
  markAllTodos: Maybe<
    { __typename?: "MarkAllTodosPayload" } & {
      changedTodos: Maybe<
        Array<{ __typename?: "Todo" } & Pick<Todo, "id" | "complete">>
      >;
      user: { __typename?: "User" } & Pick<User, "id" | "completedCount">;
    }
  >;
};

export type RemoveCompletedTodosMutationMutationVariables = {
  input: RemoveCompletedTodosInput;
};

export type RemoveCompletedTodosMutationMutation = {
  __typename?: "Mutation";
} & {
  removeCompletedTodos: Maybe<
    { __typename?: "RemoveCompletedTodosPayload" } & Pick<
      RemoveCompletedTodosPayload,
      "deletedTodoIds"
    > & {
        user: { __typename?: "User" } & Pick<
          User,
          "id" | "completedCount" | "totalCount"
        >;
      }
  >;
};

export type RemoveTodoMutationMutationVariables = {
  input: RemoveTodoInput;
};

export type RemoveTodoMutationMutation = { __typename?: "Mutation" } & {
  removeTodo: Maybe<
    { __typename?: "RemoveTodoPayload" } & Pick<
      RemoveTodoPayload,
      "deletedTodoId"
    > & {
        user: { __typename?: "User" } & Pick<
          User,
          "id" | "completedCount" | "totalCount"
        >;
      }
  >;
};

export type RenameTodoMutationMutationVariables = {
  input: RenameTodoInput;
};

export type RenameTodoMutationMutation = { __typename?: "Mutation" } & {
  renameTodo: Maybe<
    { __typename?: "RenameTodoPayload" } & {
      todo: { __typename?: "Todo" } & Pick<Todo, "id" | "text">;
    }
  >;
};
export const TodoListFooter_UserFragmentDoc = gql`
  fragment TodoListFooter_user on User {
    id
    userId
    completedCount
    todos(first: 2147483647) @connection(key: "TodoList_todos") {
      edges {
        node {
          id
          complete
        }
      }
    }
    totalCount
  }
`;
export const Todo_TodoFragmentDoc = gql`
  fragment Todo_todo on Todo {
    complete
    id
    text
  }
`;
export const Todo_UserFragmentDoc = gql`
  fragment Todo_user on User {
    id
    userId
    totalCount
    completedCount
  }
`;
export const TodoList_UserFragmentDoc = gql`
  fragment TodoList_user on User {
    todos(first: 2147483647) @connection(key: "TodoList_todos") {
      edges {
        node {
          id
          complete
          ...Todo_todo
        }
      }
    }
    id
    userId
    totalCount
    completedCount
    ...Todo_user
  }
  ${Todo_TodoFragmentDoc}
  ${Todo_UserFragmentDoc}
`;
export const TodoApp_UserFragmentDoc = gql`
  fragment TodoApp_user on User {
    id
    userId
    totalCount
    ...TodoListFooter_user
    ...TodoList_user
  }
  ${TodoListFooter_UserFragmentDoc}
  ${TodoList_UserFragmentDoc}
`;
export const AppQueryDocument = gql`
  query appQuery($userId: String) {
    user(id: $userId) {
      id
      userId
      totalCount
      completedCount
      todos(first: 2147483647) @connection(key: "TodoList_todos") {
        edges {
          node {
            id
            complete
            text
          }
        }
      }
    }
  }
`;

/**
 * __useAppQueryQuery__
 *
 * To run a query within a React component, call `useAppQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppQueryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAppQueryQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    AppQueryQuery,
    AppQueryQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<AppQueryQuery, AppQueryQueryVariables>(
    AppQueryDocument,
    baseOptions
  );
}
export function useAppQueryLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    AppQueryQuery,
    AppQueryQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<AppQueryQuery, AppQueryQueryVariables>(
    AppQueryDocument,
    baseOptions
  );
}
export type AppQueryQueryHookResult = ReturnType<typeof useAppQueryQuery>;
export type AppQueryLazyQueryHookResult = ReturnType<
  typeof useAppQueryLazyQuery
>;
export type AppQueryQueryResult = ApolloReactCommon.QueryResult<
  AppQueryQuery,
  AppQueryQueryVariables
>;
export const AddTodoMutationDocument = gql`
  mutation AddTodoMutation($input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge {
        __typename
        cursor
        node {
          complete
          id
          text
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;
export type AddTodoMutationMutationFn = ApolloReactCommon.MutationFunction<
  AddTodoMutationMutation,
  AddTodoMutationMutationVariables
>;

/**
 * __useAddTodoMutationMutation__
 *
 * To run a mutation, you first call `useAddTodoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTodoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTodoMutationMutation, { data, loading, error }] = useAddTodoMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddTodoMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    AddTodoMutationMutation,
    AddTodoMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    AddTodoMutationMutation,
    AddTodoMutationMutationVariables
  >(AddTodoMutationDocument, baseOptions);
}
export type AddTodoMutationMutationHookResult = ReturnType<
  typeof useAddTodoMutationMutation
>;
export type AddTodoMutationMutationResult = ApolloReactCommon.MutationResult<
  AddTodoMutationMutation
>;
export type AddTodoMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  AddTodoMutationMutation,
  AddTodoMutationMutationVariables
>;
export const ChangeTodoStatusMutationDocument = gql`
  mutation ChangeTodoStatusMutation($input: ChangeTodoStatusInput!) {
    changeTodoStatus(input: $input) {
      todo {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;
export type ChangeTodoStatusMutationMutationFn = ApolloReactCommon.MutationFunction<
  ChangeTodoStatusMutationMutation,
  ChangeTodoStatusMutationMutationVariables
>;

/**
 * __useChangeTodoStatusMutationMutation__
 *
 * To run a mutation, you first call `useChangeTodoStatusMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeTodoStatusMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeTodoStatusMutationMutation, { data, loading, error }] = useChangeTodoStatusMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useChangeTodoStatusMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeTodoStatusMutationMutation,
    ChangeTodoStatusMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeTodoStatusMutationMutation,
    ChangeTodoStatusMutationMutationVariables
  >(ChangeTodoStatusMutationDocument, baseOptions);
}
export type ChangeTodoStatusMutationMutationHookResult = ReturnType<
  typeof useChangeTodoStatusMutationMutation
>;
export type ChangeTodoStatusMutationMutationResult = ApolloReactCommon.MutationResult<
  ChangeTodoStatusMutationMutation
>;
export type ChangeTodoStatusMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeTodoStatusMutationMutation,
  ChangeTodoStatusMutationMutationVariables
>;
export const MarkAllTodosMutationDocument = gql`
  mutation MarkAllTodosMutation($input: MarkAllTodosInput!) {
    markAllTodos(input: $input) {
      changedTodos {
        id
        complete
      }
      user {
        id
        completedCount
      }
    }
  }
`;
export type MarkAllTodosMutationMutationFn = ApolloReactCommon.MutationFunction<
  MarkAllTodosMutationMutation,
  MarkAllTodosMutationMutationVariables
>;

/**
 * __useMarkAllTodosMutationMutation__
 *
 * To run a mutation, you first call `useMarkAllTodosMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllTodosMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllTodosMutationMutation, { data, loading, error }] = useMarkAllTodosMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMarkAllTodosMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    MarkAllTodosMutationMutation,
    MarkAllTodosMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    MarkAllTodosMutationMutation,
    MarkAllTodosMutationMutationVariables
  >(MarkAllTodosMutationDocument, baseOptions);
}
export type MarkAllTodosMutationMutationHookResult = ReturnType<
  typeof useMarkAllTodosMutationMutation
>;
export type MarkAllTodosMutationMutationResult = ApolloReactCommon.MutationResult<
  MarkAllTodosMutationMutation
>;
export type MarkAllTodosMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  MarkAllTodosMutationMutation,
  MarkAllTodosMutationMutationVariables
>;
export const RemoveCompletedTodosMutationDocument = gql`
  mutation RemoveCompletedTodosMutation($input: RemoveCompletedTodosInput!) {
    removeCompletedTodos(input: $input) {
      deletedTodoIds
      user {
        id
        completedCount
        totalCount
      }
    }
  }
`;
export type RemoveCompletedTodosMutationMutationFn = ApolloReactCommon.MutationFunction<
  RemoveCompletedTodosMutationMutation,
  RemoveCompletedTodosMutationMutationVariables
>;

/**
 * __useRemoveCompletedTodosMutationMutation__
 *
 * To run a mutation, you first call `useRemoveCompletedTodosMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCompletedTodosMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCompletedTodosMutationMutation, { data, loading, error }] = useRemoveCompletedTodosMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveCompletedTodosMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveCompletedTodosMutationMutation,
    RemoveCompletedTodosMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveCompletedTodosMutationMutation,
    RemoveCompletedTodosMutationMutationVariables
  >(RemoveCompletedTodosMutationDocument, baseOptions);
}
export type RemoveCompletedTodosMutationMutationHookResult = ReturnType<
  typeof useRemoveCompletedTodosMutationMutation
>;
export type RemoveCompletedTodosMutationMutationResult = ApolloReactCommon.MutationResult<
  RemoveCompletedTodosMutationMutation
>;
export type RemoveCompletedTodosMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveCompletedTodosMutationMutation,
  RemoveCompletedTodosMutationMutationVariables
>;
export const RemoveTodoMutationDocument = gql`
  mutation RemoveTodoMutation($input: RemoveTodoInput!) {
    removeTodo(input: $input) {
      deletedTodoId
      user {
        id
        completedCount
        totalCount
      }
    }
  }
`;
export type RemoveTodoMutationMutationFn = ApolloReactCommon.MutationFunction<
  RemoveTodoMutationMutation,
  RemoveTodoMutationMutationVariables
>;

/**
 * __useRemoveTodoMutationMutation__
 *
 * To run a mutation, you first call `useRemoveTodoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTodoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTodoMutationMutation, { data, loading, error }] = useRemoveTodoMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveTodoMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RemoveTodoMutationMutation,
    RemoveTodoMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RemoveTodoMutationMutation,
    RemoveTodoMutationMutationVariables
  >(RemoveTodoMutationDocument, baseOptions);
}
export type RemoveTodoMutationMutationHookResult = ReturnType<
  typeof useRemoveTodoMutationMutation
>;
export type RemoveTodoMutationMutationResult = ApolloReactCommon.MutationResult<
  RemoveTodoMutationMutation
>;
export type RemoveTodoMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RemoveTodoMutationMutation,
  RemoveTodoMutationMutationVariables
>;
export const RenameTodoMutationDocument = gql`
  mutation RenameTodoMutation($input: RenameTodoInput!) {
    renameTodo(input: $input) {
      todo {
        id
        text
      }
    }
  }
`;
export type RenameTodoMutationMutationFn = ApolloReactCommon.MutationFunction<
  RenameTodoMutationMutation,
  RenameTodoMutationMutationVariables
>;

/**
 * __useRenameTodoMutationMutation__
 *
 * To run a mutation, you first call `useRenameTodoMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameTodoMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameTodoMutationMutation, { data, loading, error }] = useRenameTodoMutationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRenameTodoMutationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RenameTodoMutationMutation,
    RenameTodoMutationMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RenameTodoMutationMutation,
    RenameTodoMutationMutationVariables
  >(RenameTodoMutationDocument, baseOptions);
}
export type RenameTodoMutationMutationHookResult = ReturnType<
  typeof useRenameTodoMutationMutation
>;
export type RenameTodoMutationMutationResult = ApolloReactCommon.MutationResult<
  RenameTodoMutationMutation
>;
export type RenameTodoMutationMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RenameTodoMutationMutation,
  RenameTodoMutationMutationVariables
>;
