"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../../utils/supabase";
import {
  supabaseGetAllTodos,
  supabaseInsertTodo,
} from "../../../utils/supabaseFunctions";
import { TodoType } from "./types/types";
import PrimaryButton from "./PrimaryButton";
import TodoList from "./TodoList";

const TodoApp: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);

  useEffect(() => {
    // 初回データ取得
    getSupaBaseData();

    // リアルタイムの設定
    const channels = supabase
      .channel("todo-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "todo" },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setTodos((prevTodos) => [...prevTodos, payload.new as TodoType]);
          } else if (payload.eventType === "DELETE") {
            setTodos((prevTodos) =>
              prevTodos.filter((todo) => todo.id !== payload.old.id)
            );
          } else if (payload.eventType === "UPDATE") {
            setTodos((prevTodos) =>
              prevTodos.map((todo) =>
                todo.id === payload.new.id ? (payload.new as TodoType) : todo
              )
            );
          }
        }
      )
      .subscribe();
    // クリーンアップ関数
    return () => {
      channels.unsubscribe();
    };
  }, []);

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

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTodoTitle(value);
  };

  const handleClickAddButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoTitle === "") return;
    supabaseInsertTodo(todoTitle);
    setTodoTitle("");
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
            value={todoTitle}
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
