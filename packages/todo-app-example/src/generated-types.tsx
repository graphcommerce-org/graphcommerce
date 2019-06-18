import gql from "graphql-tag";
import * as ReactApollo from "react-apollo";
import * as ReactApolloHooks from "react-apollo-hooks";
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
  __typename?: "Node";
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
  status: Scalars["String"];
  after?: Maybe<Scalars["String"]>;
  first?: Maybe<Scalars["Int"]>;
  before?: Maybe<Scalars["String"]>;
  last?: Maybe<Scalars["Int"]>;
};
export type Todo_TodoFragment = { __typename?: "Todo" } & Pick<
  Todo,
  "complete" | "id" | "text"
>;

export type Todo_UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "userId" | "totalCount" | "completedCount"
>;

export type TodoApp_UserFragment = { __typename?: "User" } & Pick<
  User,
  "id" | "userId" | "totalCount"
> &
  (TodoListFooter_UserFragment & TodoList_UserFragment);

export type TodoList_UserFragment = { __typename?: "User" } & Pick<
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
                  { __typename?: "Todo" } & Pick<Todo, "id" | "complete"> &
                    Todo_TodoFragment
                >;
              }
            >
          >
        >;
      }
    >;
  } & Todo_UserFragment;

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
export const TodoListFooter_userFragmentDoc = gql`
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
export const Todo_todoFragmentDoc = gql`
  fragment Todo_todo on Todo {
    complete
    id
    text
  }
`;
export const Todo_userFragmentDoc = gql`
  fragment Todo_user on User {
    id
    userId
    totalCount
    completedCount
  }
`;
export const TodoList_userFragmentDoc = gql`
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
  ${Todo_todoFragmentDoc}
  ${Todo_userFragmentDoc}
`;
export const TodoApp_userFragmentDoc = gql`
  fragment TodoApp_user on User {
    id
    userId
    totalCount
    ...TodoListFooter_user
    ...TodoList_user
  }
  ${TodoListFooter_userFragmentDoc}
  ${TodoList_userFragmentDoc}
`;
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
export type AddTodoMutationMutationFn = ReactApollo.MutationFn<
  AddTodoMutationMutation,
  AddTodoMutationMutationVariables
>;

export function useAddTodoMutationMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    AddTodoMutationMutation,
    AddTodoMutationMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    AddTodoMutationMutation,
    AddTodoMutationMutationVariables
  >(AddTodoMutationDocument, baseOptions);
}
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
export type ChangeTodoStatusMutationMutationFn = ReactApollo.MutationFn<
  ChangeTodoStatusMutationMutation,
  ChangeTodoStatusMutationMutationVariables
>;

export function useChangeTodoStatusMutationMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    ChangeTodoStatusMutationMutation,
    ChangeTodoStatusMutationMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    ChangeTodoStatusMutationMutation,
    ChangeTodoStatusMutationMutationVariables
  >(ChangeTodoStatusMutationDocument, baseOptions);
}
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
export type MarkAllTodosMutationMutationFn = ReactApollo.MutationFn<
  MarkAllTodosMutationMutation,
  MarkAllTodosMutationMutationVariables
>;

export function useMarkAllTodosMutationMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    MarkAllTodosMutationMutation,
    MarkAllTodosMutationMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    MarkAllTodosMutationMutation,
    MarkAllTodosMutationMutationVariables
  >(MarkAllTodosMutationDocument, baseOptions);
}
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
export type RemoveCompletedTodosMutationMutationFn = ReactApollo.MutationFn<
  RemoveCompletedTodosMutationMutation,
  RemoveCompletedTodosMutationMutationVariables
>;

export function useRemoveCompletedTodosMutationMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RemoveCompletedTodosMutationMutation,
    RemoveCompletedTodosMutationMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RemoveCompletedTodosMutationMutation,
    RemoveCompletedTodosMutationMutationVariables
  >(RemoveCompletedTodosMutationDocument, baseOptions);
}
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
export type RemoveTodoMutationMutationFn = ReactApollo.MutationFn<
  RemoveTodoMutationMutation,
  RemoveTodoMutationMutationVariables
>;

export function useRemoveTodoMutationMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RemoveTodoMutationMutation,
    RemoveTodoMutationMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RemoveTodoMutationMutation,
    RemoveTodoMutationMutationVariables
  >(RemoveTodoMutationDocument, baseOptions);
}
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
export type RenameTodoMutationMutationFn = ReactApollo.MutationFn<
  RenameTodoMutationMutation,
  RenameTodoMutationMutationVariables
>;

export function useRenameTodoMutationMutation(
  baseOptions?: ReactApolloHooks.MutationHookOptions<
    RenameTodoMutationMutation,
    RenameTodoMutationMutationVariables
  >
) {
  return ReactApolloHooks.useMutation<
    RenameTodoMutationMutation,
    RenameTodoMutationMutationVariables
  >(RenameTodoMutationDocument, baseOptions);
}
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

export function useAppQueryQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<AppQueryQueryVariables>
) {
  return ReactApolloHooks.useQuery<AppQueryQuery, AppQueryQueryVariables>(
    AppQueryDocument,
    baseOptions
  );
}
