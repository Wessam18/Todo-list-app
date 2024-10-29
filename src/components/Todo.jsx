import { useState } from "react"

export default function Todo({ todos, setTodos }) {
    const [todo, setTodo] = useState({name: "", done: false})

    
    function handleSubmit (e) {
        e.preventDefault()
        setTodos([...todos, todo])
        setTodo({name: "", done: false})
    }

    function handleDelete (item) {
        console.log(item)
        setTodos(todos.filter((todo) => todo !== item))
    }

    function handleClick (item) {
        const newArr = todos.map((todo) => 
            todo.name === item.name ? {...todo, done: !todo.done} : todo
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
                    onChange={(e) => setTodo({name: e.target.value, done: false})}
                    value={todo.name} 
                    type="text"
                    placeholder="Enter Todo Item..."
                />
                <button className="add-btn" type="submit">Add</button>
            </div>
        </form>
        <div className="todo-list" >
            {sortedTodos.map((item, idx) => (
                <div className="item" key={idx}>
                    <div className="item-name" key={item}>
                        <span className={item.done ? "completed" : ""}
                            onClick={() => handleClick(item)}>{item.name}</span>
                        <span>
                            <button className="delete-btn"
                                onClick={() => handleDelete(item)}
                            >X</button>
                        </span>
                    </div>
                    <hr className="line"></hr>
                </div>
            ))}
        </div>
    </>
    )
}