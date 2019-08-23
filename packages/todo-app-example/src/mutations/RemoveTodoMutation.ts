import {
  useRemoveTodoMutationMutation,
  RemoveTodoMutationMutation,
  Todo_UserFragment,
  Todo_TodoFragment,
  RemoveTodoInput,
  TodoList_UserFragmentDoc,
  TodoList_UserFragment
} from "../generated-types";
import { useCallback } from "react";
import { MutationUpdaterFn } from "apollo-client";
import idx from "idx.macro";

function emptyEdgeFilter<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return Boolean(value);
}

const createOptimisticResponse = (
  todo: Todo_TodoFragment,
  user: Todo_UserFragment
): RemoveTodoMutationMutation => ({
  __typename: "Mutation",
  removeTodo: {
    __typename: "RemoveTodoPayload",
    deletedTodoId: todo.id,
    user: {
      __typename: "User",
      id: user.id,
      completedCount: user.completedCount - (todo.complete ? 1 : 0),
      totalCount: user.totalCount - 1
    }
  }
});

const update: MutationUpdaterFn<RemoveTodoMutationMutation> = (
  dataProxy,
  result
) => {
  const removedItemId = idx(result, _ => _.data.removeTodo.deletedTodoId);
  const userId = idx(result, _ => _.data.removeTodo.user.id);
  if (!removedItemId || !userId) {
    return;
  }
  const data = dataProxy.readFragment<TodoList_UserFragment>({
    fragment: TodoList_UserFragmentDoc,
    fragmentName: "TodoList_user",
    id: `User:${userId}`
  });
  if (!data || !data.todos || !data.todos.edges) {
    return;
  }
  data.todos.edges = data.todos.edges
    .filter(emptyEdgeFilter)
    .filter(edge => (edge.node ? edge.node.id !== removedItemId : true));
  dataProxy.writeFragment<TodoList_UserFragment>({
    fragment: TodoList_UserFragmentDoc,
    fragmentName: "TodoList_user",
    id: `User:${userId}`,
    data
  });
};

export const useRemoveTodoMutation = () => {
  const [mutate] = useRemoveTodoMutationMutation();

  return useCallback(
    (todo: Todo_TodoFragment, user: Todo_UserFragment) => {
      const input: RemoveTodoInput = {
        id: todo.id,
        userId: user.userId
      };

      return mutate({
        variables: { input },
        optimisticResponse: createOptimisticResponse(todo, user),
        update
      });
    },
    [mutate]
  );
};
