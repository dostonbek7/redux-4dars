import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  removeTodo,
  toggleComplete,
  statistic,
} from "./features/todoSlice";
import { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const { todos, completed, uncompleted } = useSelector((store) => store.todo);
  const dispatch = useDispatch();

  const form = useRef();
  const title = useRef();
  const check = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: uuidv4(),
      title: title.current.value,
      completed: check.current.checked,
    };
    dispatch(addTodo(newTodo));

    form.current.reset();
  };

  useEffect(() => {
    dispatch(statistic());
  }, [todos, dispatch]);

  return (
    <div className="w-[300px] md:w-[500px] mx-auto py-10 md:flex-row justify-evenly">
      <h1 className="mb-8">My todos</h1>
      <form onSubmit={handleSubmit} ref={form} className="mb-8">
        <div className="mb-3">
          <span className="block text-left mb-2">Title:</span>
          <input
            required
            ref={title}
            type="text"
            placeholder="Type here..."
            className="input input-bordered input-secondary w-full"
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="block">
            <span className="block mb-2 text-left">Completed:</span>
            <input ref={check} type="checkbox" className="checkbox" />
          </div>
          <button className="btn btn-primary">Add</button>
        </div>
      </form>
      <ul className="flex flex-col gap-3 mb-5">
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className="flex items-center flex-col justify-between gap-2 md:flex-row md:gap-3"
            >
              <div>
                <h2 className="mb-2">{todo.title}</h2>
                <p>Completed: {todo.completed ? "✅" : "❌"}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => dispatch(toggleComplete(todo.id))}
                  className="btn btn-info font-bold"
                >
                  {todo.completed ? "Uncompleted" : "Completed"}
                </button>
                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="btn btn-error font-bold"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="flex justify-between items-center pt-5">
        <h2>Completed:{completed}</h2>
        <h2>Uncompleted:{uncompleted}</h2>
      </div>
    </div>
  );
}

export default App;
