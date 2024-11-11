import { useState } from "react";
import Footer from "./components/footer.jsx";
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
  const [archive, setArchive] = useState(() => {
    const storedArchive = JSON.parse(localStorage.getItem("archive"));
    return storedArchive ? storedArchive : [];
  });
  const [view, setView] = useState("home");
  const completedTodos = todos.filter((todo) => todo.done).length;
  const inProgressCount = todos.filter((todo) => todo.status === "in-progress").length;
  const todosCount = todos.filter((todo) => todo.status === "todo").length;
  const totalTodos = todos.length;

  return (
    <>
      <Header />
      <Navbar setView={setView} />
      {view === "home" ? (
        <TodoList todos={todos} setTodos={setTodos} archive={archive} setArchive={setArchive} />
      ) : (
        <Archive archive={archive} setArchive={setArchive} />
      )}
      <Footer completedTodos={completedTodos} totalTodos={totalTodos} inProgressCount={inProgressCount} todosCount={todosCount} />
    </>
  );
}

export default App;
