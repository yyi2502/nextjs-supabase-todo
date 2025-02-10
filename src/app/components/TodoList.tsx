import TodoItem from "./TodoItem";
import { TodoListProps, TodoType } from "./types/types";

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo: TodoType) => (
        <TodoItem key={todo.id} id={todo.id} title={todo.title} />
      ))}
    </ul>
  );
};
export default TodoList;
