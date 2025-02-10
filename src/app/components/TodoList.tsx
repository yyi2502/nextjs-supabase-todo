import TodoItem from "./TodoItem";
import { TodoType } from "./types/types";

type TodoListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};
const TodoList = (props: TodoListProps) => {
  const { todos, setTodos } = props;
  return (
    <ul>
      {todos.map((todo: TodoType) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          title={todo.title}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
};
export default TodoList;
