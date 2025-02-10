import TodoApp from "./components/TodoApp";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center py-20">
      <h2 className="flex flex-col font-bold text-gray-800 items-center">
        <span className="text-2xl">nextjs + typescript + supabase</span>
        <span className="text-4xl pt-3">Todo App</span>
      </h2>
      <TodoApp />
    </main>
  );
}
