import { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import EditTodoModal from "./EditTodoModal";

export default function TodoList() {
    const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);
    const [todo, setTodo] = useState({ id: Date.now(), name: "", done: false, dueDate: "", createdDate: "" });
    const [editingTodo, setEditingTodo] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    function handleSubmit(e) {
        e.preventDefault();
        const newTodo = {
            ...todo,
            id: Date.now(),
            createdDate: formatDate(new Date())
        };
        setTodos([...todos, newTodo]);
        setTodo({ id: Date.now(), name: "", done: false, dueDate: "", createdDate: "" });
    }

    function handleDelete(item) {
        setTodos(todos.filter((todo) => todo.id !== item.id));
    }

    function handleCheckboxClick(item) {
        const updatedTodos = todos.map((todo) =>
            todo.id === item.id ? { ...todo, done: !todo.done } : todo
        );
        setTodos(updatedTodos);
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
        const updatedTodos = todos.map((todo) =>
            todo.id === editingTodo.id ? { ...editingTodo } : todo
        );
        setTodos(updatedTodos);
        setIsEditModalOpen(false);
        setEditingTodo(null);
    }

    const sortedTodos = todos.slice().sort((a, b) => Number(a.done) - Number(b.done));

    return (
        <>
            <form className="form" onSubmit={handleSubmit}>
                <div className="container">
                    <input
                        className="input-todo"
                        onChange={(e) => setTodo({ ...todo, name: e.target.value })}
                        value={todo.name}
                        type="text"
                        placeholder="Enter Todo Item..."
                    />
                    <input
                        className="input-todo"
                        onChange={(e) => setTodo({ ...todo, dueDate: e.target.value })}
                        value={todo.dueDate}
                        type="date"
                        placeholder="Due Date..."
                    />
                    <button className="add-btn" type="submit">Add</button>
                </div>
            </form>
            <div className="todo-list">
                {sortedTodos.map((item) => (
                    <TodoItem
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                        onCheckboxClick={handleCheckboxClick}
                        onEdit={openEditModal}
                    />
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
