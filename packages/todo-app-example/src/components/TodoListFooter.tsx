import * as  React from "react";
import { useRemoveComletedTodosMutation } from "../mutations/RemoveCompletedTodosMutation";
import { TodoListFooter_UserFragment } from "../generated-types";
import type { None } from "../utility-types";

type Todos = Exclude<TodoListFooter_UserFragment["todos"], None>;
type Edges = Exclude<Todos["edges"], None>;
type Edge = Exclude<Edges[number], None>;

interface Props {
  user: TodoListFooter_UserFragment;
}

const TodoListFooter: React.FC<Props> = ({
  user,
  user: { todos, completedCount, totalCount },
}) => {
  const removeCompletedTodosMutation = useRemoveComletedTodosMutation();
  const completedEdges: Readonly<Todos["edges"]> =
    todos && todos.edges
      ? todos.edges.filter((edge) => edge && edge.node && edge.node.complete)
      : [];

  const handleRemoveCompletedTodosClick = () => {
    removeCompletedTodosMutation(
      {
        edges: completedEdges,
      } as Todos,
      user
    );
  };

  const numRemainingTodos = totalCount - completedCount;

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{numRemainingTodos}</strong> item
        {numRemainingTodos === 1 ? "" : "s"} left
      </span>

      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedTodosClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};

export default TodoListFooter;
