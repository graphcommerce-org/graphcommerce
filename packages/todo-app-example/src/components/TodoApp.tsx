import { useAddTodoMutation } from "../mutations/AddTodoMutation";
import TodoList from "./TodoList";
import TodoListFooter from "./TodoListFooter";
import TodoTextInput from "./TodoTextInput";

import React from "react";
import { TodoApp_UserFragment } from "../generated-types";

interface Props {
  user: TodoApp_UserFragment;
}

const TodoApp: React.FC<Props> = ({ user }) => {
  const addTodoMutation = useAddTodoMutation();
  const handleTextInputSave = (text: string) => {
    addTodoMutation(text, user);
    return;
  };

  const hasTodos = user.totalCount > 0;

  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoTextInput
            className="new-todo"
            onSave={handleTextInputSave}
            placeholder="What needs to be done?"
          />
        </header>

        <TodoList user={user} />
        {hasTodos && <TodoListFooter user={user} />}
      </section>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Frontend created by{" "}
          <a href="https://github.com/n1ru4l">Laurin Quast</a>
        </p>
        <p>
          Backend created by the{" "}
          <a href="https://facebook.github.io/relay/">Relay team</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
};

export default TodoApp;
