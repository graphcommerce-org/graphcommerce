import * as React from "react";
import { useMarkAllTodosMutation } from "../mutations/MarkAllTodosMutation";
import Todo from "./Todo";
import type { TodoList_UserFragment } from "../generated-types";
import type { None } from "../utility-types";

type Todos = Exclude<TodoList_UserFragment, None>["todos"];
type Edges = Exclude<Todos, None>["edges"];
type Edge = Exclude<Edges, None>[number];
type Node = Exclude<Exclude<Edge, None>["node"], None>;

interface Props {
  user: TodoList_UserFragment;
}

function isDefinedFilter<TValue>(
  value: TValue
): value is Exclude<TValue, None> {
  return Boolean(value);
}

const TodoList: React.FC<Props> = ({
  user,
  user: { todos, totalCount, completedCount },
}) => {
  const markAllTodosMutation = useMarkAllTodosMutation();
  const handleMarkAllChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;

    if (todos) {
      markAllTodosMutation(complete, todos, user);
    }
  };

  const nodes: Readonly<Node[]> =
    todos && todos.edges
      ? todos.edges
          .filter(isDefinedFilter)
          .map((edge) => edge.node)
          .filter(isDefinedFilter)
      : [];

  return (
    <section className="main">
      <input
        checked={totalCount === completedCount}
        className="toggle-all"
        onChange={handleMarkAllChange}
        type="checkbox"
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list">
        {nodes.map((node) => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
