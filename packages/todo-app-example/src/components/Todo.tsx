import * as React from "react";
import { useChangeTodoStatusMutation } from "../mutations/ChangeTodoStatusMutation";
import { useRemoveTodoMutation } from "../mutations/RemoveTodoMutation";
import { useRenameTodoMutation } from "../mutations/RenameTodoMutation";
import TodoTextInput from "./TodoTextInput";
import classnames from "classnames";
import type { Todo_TodoFragment, Todo_UserFragment } from "../generated-types";

interface Props {
  todo: Todo_TodoFragment;
  user: Todo_UserFragment;
}

const Todo: React.FC<Props> = ({ todo, user }) => {
  const renameTodoMutation = useRenameTodoMutation();
  const changeTodoStatusMutation = useChangeTodoStatusMutation();
  const removeTodoMutation = useRemoveTodoMutation();
  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  const handleCompleteChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;
    changeTodoStatusMutation(complete, todo, user);
  };

  const handleDestroyClick = () => removeTodo();
  const handleLabelDoubleClick = () => setIsEditing(true);
  const handleTextInputCancel = () => setIsEditing(false);

  const handleTextInputDelete = () => {
    setIsEditing(false);
    removeTodo();
  };

  const handleTextInputSave = (text: string) => {
    setIsEditing(false);
    renameTodoMutation(text, todo);
  };

  const removeTodo = () => removeTodoMutation(todo, user);

  return (
    <li
      className={classnames({
        completed: todo.complete,
        editing: isEditing,
      })}
    >
      <div className="view">
        <input
          checked={todo.complete}
          className="toggle"
          onChange={handleCompleteChange}
          type="checkbox"
        />

        <label onDoubleClick={handleLabelDoubleClick}>{todo.text}</label>
        <button className="destroy" onClick={handleDestroyClick} />
      </div>

      {isEditing && (
        <TodoTextInput
          className="edit"
          commitOnBlur={true}
          initialValue={todo.text}
          onCancel={handleTextInputCancel}
          onDelete={handleTextInputDelete}
          onSave={handleTextInputSave}
        />
      )}
    </li>
  );
};

export default Todo;
