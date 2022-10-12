import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import useApiCall from "./hooks/useApiCall";

interface Todo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

function App() {
  const [saveTodosSate, saveTodos] = useApiCall<Todo>();

  const fetchTodos = async () => {
    const result = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const json = await result.json();
    return json;
  };

  useEffect(() => {
    saveTodos(() => fetchTodos());
  }, [saveTodos]);

  console.log(saveTodosSate);

  return (
    <div className="App">
      {saveTodosSate.loading ? (
        <p>Loading</p>
      ) : (
        <p>{saveTodosSate.data?.title}</p>
      )}
    </div>
  );
}

export default App;
