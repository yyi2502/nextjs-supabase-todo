import { useState } from "react";
import PrimaryButton from "./PrimaryButton";
import {
  supabaseDeleteTodo,
  supabaseUpdateTodo,
  TodoType,
} from "@/utils/supabaseFunctions";

const TodoItem: React.FC<TodoType> = ({ title = "", id = 0 }) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");

  // deleteボタンクリック時
  const handleDeleteButton = (props: TodoType) => {
    const { id } = props;
    const deleteTodo = async () => {
      await supabaseDeleteTodo(id);
    };
    deleteTodo();
  };

  // editボタンクリック時
  const handleEditButton = () => {
    setEditTitle(title);
    setIsEditing(true);
  };

  // saveボタンクリック時
  const handleSaveButton = (props: TodoType) => {
    const { id } = props;
    const saveTodo = async () => {
      const todo: TodoType = { id, title: editTitle };
      await supabaseUpdateTodo(todo);
    };
    saveTodo();
    setIsEditing(false);
  };

  // 編集input変更時
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEditTitle(value);
  };

  return (
    <li className="flex justify-between items-center border-l-4 p-2 mt-3 gap-3 bg-gray-50">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editTitle}
            className="w-full"
            onChange={handleChangeInput}
          />
          <PrimaryButton handleClick={() => handleSaveButton({ id })}>
            save
          </PrimaryButton>
        </>
      ) : (
        <>
          <p className="w-full">{title}</p>
          <PrimaryButton handleClick={handleEditButton}>edit</PrimaryButton>
        </>
      )}
      <PrimaryButton handleClick={() => handleDeleteButton({ id })}>
        delete
      </PrimaryButton>
    </li>
  );
};
export default TodoItem;
