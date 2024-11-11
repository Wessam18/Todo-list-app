import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import EditTodoModal from "./EditTodoModal";

export default function TodoList({ todos, setTodos, archive, setArchive }) {
  const [todo, setTodo] = useState({ id: Date.now(), name: "", done: false, dueDate: "", createdDate: "", status: "todo" });
  const [editingTodo, setEditingTodo] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const formatDate = (date) => `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("archive", JSON.stringify(archive));
  }, [archive]);

  function handleSubmit(e) {
    e.preventDefault();
    const newTodo = {
      ...todo,
      id: Date.now(),
      createdDate: formatDate(new Date()),
      status: "todo"
    };
    setTodos([...todos, newTodo]);
    setTodo({ id: Date.now(), name: "", done: false, dueDate: "", createdDate: "", status: "todo" });
  }

  function handleDelete(item) {
    setArchive([...archive, item]);
    setTodos(todos.filter((todo) => todo.id !== item.id));
  }

  function handleCheckboxClick(item) {
    if (item.status !== "done") {
      setTodos(todos.map((todo) => todo.id === item.id ? { ...todo, done: !todo.done } : todo));
    }
  }

  function openEditModal(item) {
    setEditingTodo({ ...item });
    setIsEditModalOpen(true);
  }

  function handleEditChange(e) {
    const { name, value } = e.target;
    setEditingTodo((prev) => ({ ...prev, [name]: value }));
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    setTodos(todos.map((todo) => todo.id === editingTodo.id ? { ...editingTodo } : todo));
    setIsEditModalOpen(false);
    setEditingTodo(null);
  }

  function advanceStatus(item) {
    const newStatus = item.status === "todo" ? "in-progress" : item.status === "in-progress" ? "done" : "todo";
    setTodos(todos.map((todo) => todo.id === item.id ? { ...todo, status: newStatus, done: newStatus === "done" } : todo));
  }

  function moveToArchive(item) {
    setArchive([...archive, item]);
    setTodos(todos.filter((todo) => todo.id !== item.id));
  }

  const columns = {
    "To Do": todos.filter((todo) => todo.status === "todo"),
    "In Progress": todos.filter((todo) => todo.status === "in-progress"),
    "Done": todos.filter((todo) => todo.status === "done")
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        <div className="container">
          <input className="input-todo" onChange={(e) => setTodo({ ...todo, name: e.target.value })} value={todo.name} type="text" placeholder="Enter Todo Item..." />
          <input className="input-todo" onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })} value={todo.dueDate} type="date" placeholder="Due Date..." />
          <button className="add-btn" type="submit">Add</button>
        </div>
      </form>

      <div className="kanban-board">
        {Object.keys(columns).map((column) => (
          <div key={column} className="kanban-column">
            <h3>{column}</h3>
            {columns[column].map((item) => (
              <TodoItem
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onCheckboxClick={handleCheckboxClick}
                onEdit={openEditModal}
                advanceStatus={advanceStatus}
                moveToArchive={item.status === "done" ? moveToArchive : null}
              />
            ))}
          </div>
        ))}
      </div>

      {isEditModalOpen && (
        <EditTodoModal
          editingTodo={editingTodo}
          handleEditChange={handleEditChange}
          handleEditSubmit={handleEditSubmit}
          closeModal={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
}
