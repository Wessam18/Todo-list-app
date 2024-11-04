import { useEffect, useState } from "react"

export default function Todo({ todos, setTodos }) {

    const [todo, setTodo] = useState({name: "", done: false, dueDate: ""})


    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos))
    }, [todos])

    function handleSubmit (e) {
        e.preventDefault()
        setTodos([...todos, todo])
        setTodo({name: "", done: false, dueDate: ""})
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
                        <span className={item.done ? "completed" : ""}
                            onClick={() => handleClick(item)}
                        > 
                            {item.name}
                        </span>
                        <span>
                            <button className="delete-btn"
                                onClick={() => handleDelete(item)}
                            >X</button>
                        </span>
                    </div>
                    <div className="due-date"> 
                        <span>{`- Due date: ${item.dueDate}`}</span>
                    </div>
                    <hr className="line"></hr>
                </div>
            ))}
        </div>
    </>
    )
}