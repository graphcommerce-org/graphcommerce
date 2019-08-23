import {
  useRenameTodoMutationMutation,
  Todo_TodoFragment,
  RenameTodoInput,
  RenameTodoMutationMutation
} from "../generated-types";
import { useCallback } from "react";

const createOptimisticResponse = (
  text: string,
  todo: Todo_TodoFragment
): RenameTodoMutationMutation => ({
  __typename: "Mutation",
  renameTodo: {
    __typename: "RenameTodoPayload",
    todo: {
      __typename: "Todo",
      id: todo.id,
      text
    }
  }
});

export const useRenameTodoMutation = () => {
  const [mutate] = useRenameTodoMutationMutation();

  return useCallback(
    (text: string, todo: Todo_TodoFragment) => {
      const input: RenameTodoInput = {
        text: text,
        id: todo.id
      };
      return mutate({
        variables: { input },
        optimisticResponse: createOptimisticResponse(text, todo)
      });
    },
    [mutate]
  );
};
