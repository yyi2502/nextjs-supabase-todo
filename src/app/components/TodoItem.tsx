import { useState } from "react";
import { TodoType } from "./types/types";
import {
  supabaseDeleteTodo,
  supabaseUpdateTodo,
} from "../../../utils/supabaseFunctions";
import PrimaryButton from "./PrimaryButton";

const TodoItem = (props: TodoType) => {
  const { title, id } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");
  const handleDeleteButton = (id: number) => {
    const deleteTodo = async () => {
      await supabaseDeleteTodo(id);
    };
    deleteTodo();
  };

  const handleEditButton = () => {
    setEditTitle(title);
    setIsEditing(true);
  };
  const handleSaveButton = (id: number) => {
    const saveTodo = async () => {
      await supabaseUpdateTodo(id, editTitle);
    };
    saveTodo();
    setIsEditing(false);
  };

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
          <PrimaryButton handleClick={() => handleSaveButton(id)}>
            save
          </PrimaryButton>
        </>
      ) : (
        <>
          <p className="w-full">{title}</p>
          <PrimaryButton handleClick={handleEditButton}>edit</PrimaryButton>
        </>
      )}
      <PrimaryButton handleClick={() => handleDeleteButton(id)}>
        delete
      </PrimaryButton>
    </li>
  );
};
export default TodoItem;
