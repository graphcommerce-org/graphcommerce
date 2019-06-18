import {
  useChangeTodoStatusMutationMutation,
  ChangeTodoStatusInput,
  Todo_TodoFragment,
  Todo_UserFragment,
  ChangeTodoStatusMutationMutation
} from "../generated-types";
import { useCallback } from "react";

const createOptimisticResponse = (
  complete: boolean,
  todo: Todo_TodoFragment,
  user: Todo_UserFragment
): ChangeTodoStatusMutationMutation => ({
  __typename: "Mutation",
  changeTodoStatus: {
    __typename: "ChangeTodoStatusPayload",
    todo: {
      __typename: "Todo",
      complete: complete,
      id: todo.id
    },
    user: {
      __typename: "User",
      id: user.id,
      completedCount: complete
        ? user.completedCount + 1
        : user.completedCount - 1
    }
  }
});

export const useChangeTodoStatusMutation = () => {
  const mutate = useChangeTodoStatusMutationMutation();

  return useCallback(
    (complete: boolean, todo: Todo_TodoFragment, user: Todo_UserFragment) => {
      const input: ChangeTodoStatusInput = {
        complete,
        userId: user.userId,
        id: todo.id
      };

      return mutate({
        variables: { input },
        optimisticResponse: createOptimisticResponse(complete, todo, user)
      });
    },
    [mutate]
  );
};
