import { useEffect, useState, useRef } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faCircleInfo, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons'; // Import the trash can icon


export default function Todo({ todos, setTodos }) {

    const [todo, setTodo] = useState({name: "", done: false, dueDate: "", createdDate: ""})

    // Function to format the date
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();

        const daySuffix = (day) => {
            if (day > 3 && day < 21) return 'th';
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        };

        return `${day}${daySuffix(day)} ${month} ${year}`;
    };

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    function handleSubmit (e) {
        e.preventDefault()
        const newTodo = {
            ...todo,
            createdDate: formatDate(new Date()) // Format the current date
        };
        setTodos([...todos, newTodo])
        setTodo({name: "", done: false, dueDate: "", createdDate: ""})
    }

    function handleDelete (item) {
        console.log(item)
        setTodos(todos.filter((todo) => todo !== item))
    }

    function handleClick (item) {
        const newArr = todos.map((todo) => 
            todo.name === item.name && todo.dueDate === item.dueDate ? {...todo, done: !todo.done} : todo
        )
        setTodos(newArr)
        console.log(newArr)
    }

    function handleCheckboxClick(item) {
        const updatedTodos = todos.map((todo) =>
            todo.name === item.name && todo.dueDate === item.dueDate
                ? { ...todo, done: !todo.done }
                : todo
        );
        setTodos(updatedTodos);
    }

    const sortedTodos = todos.slice().sort((a,b) => Number(a.done) - Number(b.done))

    
    return (
     <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="container">
                <input className="input-todo"
                    onChange={(e) => setTodo({...todo, name: e.target.value})}
                    value={todo.name} 
                    type="text"
                    placeholder="Enter Todo Item..."
                />
                <input className="input-todo"
                    onChange={(e) => setTodo({...todo , dueDate: e.target.value})}
                    value={todo.dueDate} 
                    type="date"
                    placeholder="due date..."
                />
                <button className="add-btn" type="submit">Add</button>
            </div>
        </form>
        <div className="todo-list" >
            {sortedTodos.map((item, idx) => (
                <div className="item" key={idx}>
                    <div className="item-name" key={item}>
                        <div className="check-title">
                            <FontAwesomeIcon
                                icon={item.done ? faSquareCheck : faSquare}
                                onClick={() => handleCheckboxClick(item)}
                                className="checkbox-icon"
                                style={{
                                    color: item.done ? 'rgb(59, 113, 202, 1)' : 'transparent',
                                    cursor: 'pointer',
                                    border: item.done ? 'none' : '1.5px solid rgb(59, 113, 202, 1)',
                                    borderRadius: '3px', // Optional rounded corners,
                                    marginRight: '15px'
                                }}
                            />
                            <span className={item.done ? "completed" : ""}
                                onClick={() => handleClick(item)}
                            > 
                                {item.name}
                            </span>
                        </div>
                        <span>
                            <FontAwesomeIcon 
                                icon={faPen} // Add the pen icon
                                onClick={() => /* add edit functionality here if needed */ {}}
                                className="edit-btn"
                            />
                            <FontAwesomeIcon 
                                icon={faTrashCan} // Use the trash can icon
                                onClick={() => handleDelete(item)} // Handle delete
                                className="delete-btn"
                            />
                        </span>
                    </div>
                    <div className="due-date"> 
                        <span>{`- Due date: ${item.dueDate}`}</span>
                        <div className="create-icon">
                            <FontAwesomeIcon 
                                icon={faCircleInfo} // Info icon
                                className="info-icon"
                                style={{ color: 'gray', cursor: 'pointer' }}
                                title={`Created on: ${item.createdDate}`} // Add a tooltip for created date
                            />
                            <span className="created-date">{`${item.createdDate}`}</span>
                        </div>
                    </div>
                    <hr className="line"></hr>
                </div>
            ))}
        </div>
    </>
    )
}