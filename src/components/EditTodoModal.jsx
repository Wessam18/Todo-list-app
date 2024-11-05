// EditTodoModal.js
import React from 'react';

export default function EditTodoModal({ editingTodo, handleEditChange, handleEditSubmit, closeModal }) {
    return (
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
                        onClick={closeModal}
                        className="cancel-btn"
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}
