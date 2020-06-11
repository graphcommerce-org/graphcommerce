import * as React from "react";
import {
  useMarkAllTodosMutationMutation,
  TodoList_UserFragment,
  MarkAllTodosInput,
  MarkAllTodosMutationMutation,
} from "../generated-types";
import type { None } from "../utility-types"

type Todos = Exclude<TodoList_UserFragment["todos"], None>;
type ChangedTodos = Exclude<
  Exclude<MarkAllTodosMutationMutation["markAllTodos"], None>["changedTodos"],
  None
>;
type ChangedTodo = ChangedTodos[number];

function emptyEdgeFilter<TValue>(
  value: TValue
): value is Exclude<TValue, None> {
  return Boolean(value);
}

const createOptimisticResponse = (
  complete: boolean,
  todos: Todos,
  user: TodoList_UserFragment
): MarkAllTodosMutationMutation => {
  const changedTodos: ChangedTodos = todos.edges
    ? todos.edges
        .filter(emptyEdgeFilter)
        .map((edge) => edge.node)
        .filter(emptyEdgeFilter)
        .filter((node) => node.complete !== complete)
        .map(
          (node): ChangedTodo => ({
            complete,
            id: node.id,
          })
        )
    : [];

  return {
    __typename: "Mutation",
    markAllTodos: {
      __typename: "MarkAllTodosPayload",
      changedTodos,
      user: {
        __typename: "User",
        id: user.id,
        completedCount: complete ? user.totalCount : 0,
      },
    },
  };
};

export const useMarkAllTodosMutation = () => {
  const [mutate] = useMarkAllTodosMutationMutation();
  return React.useCallback(
    (complete: boolean, todos: Todos, user: TodoList_UserFragment) => {
      const input: MarkAllTodosInput = {
        complete,
        userId: user.userId,
      };

      return mutate({
        variables: {
          input,
        },
        optimisticResponse: createOptimisticResponse(complete, todos, user),
      });
    },
    [mutate]
  );
};
