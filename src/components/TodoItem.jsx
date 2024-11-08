import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faCircleInfo, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

export default function TodoItem({ item, onDelete, onEdit, advanceStatus, moveToArchive }) {
  return (
    <div className="item">
      <div className="item-name">
        <div className="check-title">
          {/* Only render checkbox and "completed" class for tasks in "done" status */}
          {item.status === "done" && (
            <FontAwesomeIcon
              icon={item.done ? faSquareCheck : faSquare}
              className="checkbox-icon"
              style={{
                color: item.done ? 'rgb(59, 113, 202, 1)' : 'transparent',
                cursor: 'pointer',
                border: item.done ? 'none' : '1.5px solid rgb(59, 113, 202, 1)',
                borderRadius: '3px',
                marginRight: '15px'
              }}
            />
          )}
          <span className={item.status === "done" && item.done ? "completed" : ""}>{item.name}</span>
        </div>
        <span>
          {item.status !== "done" && (
            <FontAwesomeIcon
              icon={faPen}
              onClick={() => onEdit(item)}
              className="edit-btn"
            />
          )}
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={() => onDelete(item)}
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

      {/* Conditionally render buttons based on task status */}
      {item.status === "todo" && (
        <button onClick={() => advanceStatus(item)} className="move-btn">Move to In Progress</button>
      )}
      {item.status === "in-progress" && (
        <button onClick={() => advanceStatus(item)} className="move-btn">Move to Done</button>
      )}
      {item.status === "done" && (
        <button onClick={() => moveToArchive(item)} className="archive-btn">Move to Archive</button>
      )}
      
      <hr className="line" />
    </div>
  );
}
