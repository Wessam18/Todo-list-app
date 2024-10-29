import { useState } from "react";
import Footer from "./components/footer.jsx";
import Header from "./components/header.jsx";
import Todo from "./components/Todo.jsx";
import "./styles/style.css";

function App() {
  const [todos, setTodos] = useState([]);

  const completedTodos = todos.filter((todo) => todo.done).length;
  const totalTodos = todos.length;

  return (
    <>
      <Header />
      <Todo todos={todos} setTodos={setTodos} />
      <Footer completedTodos={completedTodos} totalTodos={totalTodos} />
    </>
  );
}

export default App;
