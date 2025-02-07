import TodoItem from "./TodoItem";
// type TodoType = {
//   id:string,
//   title : string
// }
const TodoList = () => {
  return (
    <div>
      <ul className="mt-5">
        <TodoItem />
      </ul>
    </div>
  );
};

export default TodoList;
