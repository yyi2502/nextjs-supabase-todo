import { ReactNode } from "react";

export type PrimaryButtonProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  handleClick?: () => void;
};

export type TodoType = {
  id: number;
  title: string;
};

export type TodoListProps = {
  todos: TodoType[];
};
