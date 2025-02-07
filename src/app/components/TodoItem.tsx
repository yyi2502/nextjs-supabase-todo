const TodoItem = () => {
  return (
    <li className="flex justify-between gap-3 bg-gray-50 py-2 px-3 mt-3 border-l-4">
      <p className="w-full">
        あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお
      </p>
      <button className="bg-green-200 px-3 rounded-lg hover:bg-green-400">
        edit
      </button>
      <button className="bg-red-200 px-3 rounded-lg hover:bg-red-400">
        delete
      </button>
    </li>
  );
};

export default TodoItem;
