import {
  useAddTodoMutationMutation,
  AddTodoInput,
  TodoApp_UserFragment,
  AddTodoMutationMutation,
  TodoList_userFragmentDoc,
  TodoList_UserFragment
} from "../generated-types";
import { FetchResult } from "react-apollo";
import idx from "idx.macro";
import { useCallback } from "react";
import { MutationUpdaterFn } from "react-apollo";

let tempID = 0;

const createOptimisticResponse = (
  text: string,
  user: TodoApp_UserFragment
): AddTodoMutationMutation => {
  return {
    __typename: "Mutation",
    addTodo: {
      __typename: "AddTodoPayload",
      todoEdge: {
        __typename: "TodoEdge",
        cursor: "client:newTodoEdge:" + tempID++,
        node: {
          __typename: "Todo",
          id: "client:newTodo:" + tempID++,
          text,
          complete: false
        }
      },
      user: {
        __typename: "User",
        id: user.id,
        totalCount: user.totalCount
      }
    }
  };
};

const update: MutationUpdaterFn<AddTodoMutationMutation> = (proxy, result) => {
  const userId = idx(result, _ => _.data.addTodo.user.id);
  if (!userId) {
    return;
  }
  const data = proxy.readFragment<TodoList_UserFragment>({
    fragment: TodoList_userFragmentDoc,
    fragmentName: "TodoList_user",
    id: `User:${userId}`
  });
  if (!data) {
    return;
  }
  const edges = idx(data, _ => _.todos.edges);
  const addTodo = idx(result, _ => _.data.addTodo);
  if (!edges || !addTodo) {
    return;
  }
  edges.push(addTodo.todoEdge);
  proxy.writeFragment<TodoList_UserFragment>({
    fragment: TodoList_userFragmentDoc,
    fragmentName: "TodoList_user",
    id: `User:${userId}`,
    data
  });
};

type AddTodoMutationFetchResult = FetchResult<
  AddTodoMutationMutation,
  Record<string, any>,
  Record<string, any>
>;

export const useAddTodoMutation = () => {
  const mutate = useAddTodoMutationMutation();

  return useCallback(
    (text: string, user: TodoApp_UserFragment) => {
      const input: AddTodoInput = {
        text,
        userId: user.userId,
        clientMutationId: `${tempID++}`
      };

      return mutate({
        variables: { input },
        optimisticResponse: createOptimisticResponse(text, user),
        update
      });
    },
    [mutate]
  );
};
