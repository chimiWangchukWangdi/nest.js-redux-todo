import dynamic from "next/dynamic";

const TodoListing = dynamic(import("../components/todo-listing"));
export default function Home() {
  return (
    <>
      <h1>Todo</h1>
      <div>
        <TodoListing></TodoListing>
      </div>
    </>
  );
}
