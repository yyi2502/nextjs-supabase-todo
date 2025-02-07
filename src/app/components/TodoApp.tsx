"use client";
import { useEffect, useState } from "react";
import TodoList from "./TodoList";
import { getAllTodos } from "../../../utils/supabaseFunctions";

const TodoApp = () => {
  const [todos, setTodos] = useState<any>([]); //any後で直す
  useEffect(() => {
    const getTodos = async () => {
      //22:12あたり
      const allTodos = await getAllTodos();
      setTodos(allTodos);
      console.log(todos);
    };
    getTodos();
  }, []);
  return (
    <section className="w-full bg-white shadow-md rounded-lg max-w-xl mt-10 p-5">
      <form className="flex justify-between gap-3">
        <input
          type="text"
          placeholder="入力してね"
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="bg-blue-200 px-3 rounded-lg hover:bg-blue-400">
          add
        </button>
      </form>
      <TodoList />
    </section>
  );
};

export default TodoApp;
