export default function Footer ({completedTodos, totalTodos, inProgressCount, todosCount}) {
    return (
        <div className="footer">
            <span>Todos: {todosCount}</span>
            <span>In-Progress Todos: {inProgressCount}</span>
            <span>Completed Todos:  {completedTodos}</span>
            <span>Total Todos:  {totalTodos}</span>
        </div>
    )

}