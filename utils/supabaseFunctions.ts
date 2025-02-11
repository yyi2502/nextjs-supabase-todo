import { TodoListProps, TodoType } from "@/app/components/types/types";
import { supabase } from "./supabase";

// 取得
export const supabaseGetAllTodos = async () => {
  const response = await supabase.from("todo").select("*");
  return response.data;
};
export type TodoType = {
  id?: number;
  title?: string;
};
// 追加
export const supabaseInsertTodo = async (title: TodoType) => {
  await supabase.from("todo").insert([{ title: title }]);
};

// 削除
export const supabaseDeleteTodo = async (id: TodoType) => {
  await supabase.from("todo").delete().eq("id", id);
};

// 上書き
export const supabaseUpdateTodo = async ({ id, title }: TodoType) => {
  await supabase
    .from("todo")
    .update([{ title: title }])
    .eq("id", id);
};

// リアルタイムリスナー
export const subscribeToTodoChanges = (
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>
) => {
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
  return channels;
};
