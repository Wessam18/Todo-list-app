export default function Footer ({completedTodos, totalTodos}) {
    return (
        <div className="footer">
            <span>Completed Todos:  {completedTodos}</span>
            <span>Total Todos:  {totalTodos}</span>
        </div>
    )

}