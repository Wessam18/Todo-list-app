import { useState } from "react";
import Footer from "./components/footer.jsx"
import Header from "./components/header.jsx";
import TodoList from "./components/Todo.jsx";
import Archive from "./components/Archive.jsx";
import Navbar from "./components/Navbar.jsx";
import "./styles/style.css";

function App() {
  const [todos, setTodos] = useState(() => {
    const storedItems = JSON.parse(localStorage.getItem("todos"));
    return storedItems ? storedItems : [];
  });
  const [view, setView] = useState("home"); // Track current view
  const completedTodos = todos.filter((todo) => todo.done).length;
  const totalTodos = todos.length;

  return (
    <>
      <Header />
      <Navbar setView={setView} />
      {view === "home" ? (
        <TodoList todos={todos} setTodos={setTodos} />
      ) : (
        <Archive archive={JSON.parse(localStorage.getItem("archive")) || []} />
      )}
      <Footer completedTodos={completedTodos} totalTodos={totalTodos} />
    </>
  );
}

export default App;
