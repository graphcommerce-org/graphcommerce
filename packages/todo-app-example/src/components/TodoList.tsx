import { useMarkAllTodosMutation } from "../mutations/MarkAllTodosMutation";
import Todo from "./Todo";

import React from "react";
import { TodoList_UserFragment, Maybe } from "../generated-types";
type Todos = Exclude<TodoList_UserFragment, null>["todos"];
type Edges = Exclude<Todos, null>["edges"];
type Edge = Exclude<Edges, null>[number];
type Node = Exclude<Exclude<Edge, null>["node"], null>;

interface Props {
  user: TodoList_UserFragment;
}

function isDefinedFilter<TValue>(value: Maybe<TValue>): value is TValue {
  return Boolean(value);
}

const TodoList: React.FC<Props> = ({
  user,
  user: { todos, totalCount, completedCount }
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
          .map(edge => edge.node)
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
        {nodes.map(node => (
          <Todo key={node.id} todo={node} user={user} />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
