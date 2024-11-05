import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPen, faCircleInfo, faSquareCheck, faSquare } from '@fortawesome/free-solid-svg-icons';

export default function TodoItem({ item, onDelete, onCheckboxClick, onEdit }) {
    return (
        <div className="item">
            <div className="item-name">
                <div className="check-title">
                    <FontAwesomeIcon
                        icon={item.done ? faSquareCheck : faSquare}
                        onClick={() => onCheckboxClick(item)}
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
                        onClick={() => onCheckboxClick(item)}
                    >
                        {item.name}
                    </span>
                </div>
                <span>
                    <FontAwesomeIcon
                        icon={faPen}
                        onClick={() => onEdit(item)}
                        className="edit-btn"
                    />
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
            <hr className="line" />
        </div>
    );
}
