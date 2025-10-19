import useTodoStore from "./store";
import "./App.css";

function App() {
  const { todos, addTodo, removeTodo } = useTodoStore();

  return (
    <>
      <h1>Zustand Store</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const todo = e.target.elements.todo.value;
          addTodo({ id: self.crypto.randomUUID(), title: todo });
          e.target.reset();
        }}
      >
        <input type="text" name="todo" />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}
            <button onClick={() => removeTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
