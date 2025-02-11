"use client";
import { useEffect, useState } from "react";
import {
  subscribeToTodoChanges,
  supabaseGetAllTodos,
  supabaseInsertTodo,
} from "@/utils/supabaseFunctions";
import { TodoType } from "@/types/types";
import PrimaryButton from "./PrimaryButton";
import TodoList from "./TodoList";

const TodoApp: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    // 初回データ取得
    getSupaBaseData();

    // リアルタイムリスナーの開始
    const channels = subscribeToTodoChanges(setTodos);
    // クリーンアップ関数
    return () => {
      channels.unsubscribe();
    };
  }, []);

  // 初回データ取得
  const getSupaBaseData = async () => {
    try {
      const response = await supabaseGetAllTodos();
      if (response) {
        setTodos(response);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // input変更時
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  // addボタンクリック時
  const handleClickAddButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === "") return;
    supabaseInsertTodo(title);
    setTitle("");
  };

  return (
    <main className="w-full mt-10">
      <h1 className="text-center text-gray-800 text-2xl">todo app</h1>
      <section className="container mx-auto max-w-[600px] px-5 py-7 mt-5 bg-white shadow-md rounded-lg">
        <form
          onSubmit={handleClickAddButton}
          className="flex justify-between gap-3"
        >
          <input
            type="text"
            placeholder="入力してください"
            value={title}
            className="w-full border bg-gray-50 rounded-lg px-2"
            onChange={handleChangeInput}
          />
          <PrimaryButton type="submit">add</PrimaryButton>
        </form>
        <TodoList todos={todos} />
      </section>
    </main>
  );
};

export default TodoApp;
