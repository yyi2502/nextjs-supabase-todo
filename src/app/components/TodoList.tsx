import TodoItem from "./TodoItem";
import { TodoType } from "./types/types";

const TodoList = (props: TodoType[]) => {
  return (
    <ul>
      {props.map((todo: TodoType) => (
        <TodoItem key={todo.id} id={todo.id} title={todo.title} />
      ))}
    </ul>
  );
};
export default TodoList;
