import { supabase } from "./supabase";
import { TodoType } from "@/types/types";

// 取得
export const supabaseGetAllTodos = async (): Promise<TodoType[]> => {
  const { data } = await supabase.from("todo").select("*");
  return data as TodoType[];
};

// 追加
export const supabaseInsertTodo = async (title: string): Promise<void> => {
  await supabase.from("todo").insert([{ title: title }]);
};

// 削除
export const supabaseDeleteTodo = async (id: number): Promise<void> => {
  await supabase.from("todo").delete().eq("id", id);
};

// 上書き
export const supabaseUpdateTodo = async (todo: TodoType): Promise<void> => {
  await supabase
    .from("todo")
    .update([{ title: todo.title }])
    .eq("id", todo.id);
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
        // 追加の場合
        if (payload.eventType === "INSERT") {
          setTodos((prevTodos) => [...prevTodos, payload.new as TodoType]);
          // 削除の場合
        } else if (payload.eventType === "DELETE") {
          setTodos((prevTodos) =>
            prevTodos.filter((todo) => todo.id !== payload.old.id)
          );
          // 編集の場合
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
