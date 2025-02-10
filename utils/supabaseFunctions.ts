import { supabase } from "./supabase";

// 取得
export const supabaseGetAllTodos = async () => {
  const response = await supabase.from("todo").select("*");
  return response.data;
};

// 追加
export const supabaseInsertTodo = async (title: string) => {
  await supabase.from("todo").insert([{ title: title }]);
};

// 削除
export const supabaseDeleteTodo = async (id: number) => {
  await supabase.from("todo").delete().eq("id", id);
};

// 上書き
export const supabaseUpdateTodo = async (id: number, title: string) => {
  await supabase
    .from("todo")
    .update([{ title: title }])
    .eq("id", id);
};
