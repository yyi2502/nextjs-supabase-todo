import { ReactNode } from "react";

// ボタンの型定義
export type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  handleClick?: () => void;
};

// todoの型定義
export type TodoType = {
  id: number;
  title: string;
};

// todosのの型定義
export type TodoListProps = {
  todos: TodoType[];
};
