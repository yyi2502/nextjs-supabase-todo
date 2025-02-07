import { supabase } from "./supabase";

// 取得
export const getAllTodos = async () => {
  const response = await supabase.from("todo").select("*");
  return response;
};

// 削除
// 追加
