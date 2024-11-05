import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faCircleInfo, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

export default function Todo({ todos, setTodos }) {
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
            id: Date.now(), // Unique ID for each task
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
            todo.id === item.id
                ? { ...todo, done: !todo.done }
                : todo
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
                {sortedTodos.map((item, idx) => (
                    <div className="item" key={item.id}>
                        <div className="item-name">
                            <div className="check-title">
                                <FontAwesomeIcon
                                    icon={item.done ? faSquareCheck : faSquare}
                                    onClick={() => handleCheckboxClick(item)}
                                    className="checkbox-icon"
                                    style={{
                                        color: item.done ? 'rgb(59, 113, 202, 1)' : 'transparent',
                                        cursor: 'pointer',
                                        border: item.done ? 'none' : '1.5px solid rgb(59, 113, 202, 1)',
                                        borderRadius: '3px',
                                        marginRight: '15px'
                                    }}
                                />
                                <span
                                    className={item.done ? "completed" : ""}
                                    onClick={() => handleCheckboxClick(item)}
                                >
                                    {item.name}
                                </span>
                            </div>
                            <span>
                                <FontAwesomeIcon
                                    icon={faPen}
                                    onClick={() => openEditModal(item)}
                                    className="edit-btn"
                                />
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    onClick={() => handleDelete(item)}
                                    className="delete-btn"
                                />
                            </span>
                        </div>
                        <div className="due-date">
                            <span>{`- Due date: ${item.dueDate}`}</span>
                            <div className="create-icon">
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    className="info-icon"
                                    style={{ color: 'gray', cursor: 'pointer' }}
                                    title={`Created on: ${item.createdDate}`}
                                />
                                <span className="created-date">{`${item.createdDate}`}</span>
                            </div>
                        </div>
                        <hr className="line" />
                    </div>
                ))}
            </div>

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Edit Task</h3>
                        <form onSubmit={handleEditSubmit}>
                            <input
                                type="text"
                                name="name"
                                value={editingTodo.name}
                                onChange={handleEditChange}
                                placeholder="Edit Task Name"
                                className="input-edit"
                            />
                            <input
                                type="date"
                                name="dueDate"
                                value={editingTodo.dueDate}
                                onChange={handleEditChange}
                                className="input-edit"
                            />
                            <button type="submit" className="save-btn">Save</button>
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="cancel-btn"
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
