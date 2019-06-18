import {
  RemoveCompletedTodosInput,
  useRemoveCompletedTodosMutationMutation,
  TodoListFooter_UserFragment,
  RemoveCompletedTodosMutationMutation,
  TodoListFooter_userFragmentDoc
} from "../generated-types";
import { useCallback } from "react";
import idx from "idx.macro";
import { MutationUpdaterFn } from "react-apollo";

type Todos = Exclude<TodoListFooter_UserFragment, null>["todos"];

const createOptmisticResponse = (
  todos: Todos,
  user: TodoListFooter_UserFragment
): RemoveCompletedTodosMutationMutation => {
  const deletedTodoIds = (idx(todos, _ => _.edges) || [])
    .map(edge => edge.node)
    .filter(node => node.complete === true)
    .map(node => node.id);

  return {
    __typename: "Mutation",
    removeCompletedTodos: {
      __typename: "RemoveCompletedTodosPayload",
      deletedTodoIds,
      user: {
        __typename: "User",
        id: user.id,
        completedCount: user.completedCount - deletedTodoIds.length,
        totalCount: user.totalCount - deletedTodoIds.length
      }
    }
  };
};

const update: MutationUpdaterFn<RemoveCompletedTodosMutationMutation> = (
  dataProxy,
  result
) => {
  const deletedTodoIds = idx(
    result,
    _ => _.data.removeCompletedTodos.deletedTodoIds
  );
  const userId = idx(result, _ => _.data.removeCompletedTodos.user.id);
  if (!deletedTodoIds || !userId) {
    return;
  }

  const data = dataProxy.readFragment<TodoListFooter_UserFragment>({
    id: `User:${userId}`,
    fragment: TodoListFooter_userFragmentDoc,
    fragmentName: "TodoListFooter_user"
  });
  if (!data || !data.todos || !data.todos.edges) {
    return;
  }

  data.todos.edges = data.todos.edges.filter(edge => {
    if (!edge || !edge.node) {
      return true;
    }
    return !deletedTodoIds.includes(edge.node.id);
  });
  dataProxy.writeFragment<TodoListFooter_UserFragment>({
    id: `User:${userId}`,
    fragment: TodoListFooter_userFragmentDoc,
    fragmentName: "TodoListFooter_user",
    data
  });
};

export const useRemoveComletedTodosMutation = () => {
  const mutate = useRemoveCompletedTodosMutationMutation();

  return useCallback(
    (todos: Todos, user: TodoListFooter_UserFragment) => {
      const input: RemoveCompletedTodosInput = {
        userId: user.userId
      };

      return mutate({
        variables: { input },
        optimisticResponse: createOptmisticResponse(todos, user),
        update
      });
    },
    [mutate]
  );
};
