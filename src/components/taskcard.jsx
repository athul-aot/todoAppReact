// taskcard.jsx
import React from 'react';
import deleteIcon from "../assets/delete-icon.svg";
import editIcon from "../assets/edit-icon.svg";
import calendarIcon from "../assets/calender.svg";
import checkedIcon from "../assets/checked.svg";
 // Import the checked icon

function TaskCard({ task, editTaskHandle, toggleTaskStatus, handleDeleteClick }) {
  const isOverdue = new Date(task.dueDate) < new Date();
  const showOverdueStyle = isOverdue && !task.status;
  const showCompletedStyle = task.status;

  return (
    <div className="task-card">
      <div className="task-card-sub">
        <div className="checked">
          <input
            type="checkbox"
            checked={task.status}
            onChange={() => toggleTaskStatus(task)}
            id={`checkbox-${task.taskId}`} // Unique ID for the input element
          />
          <label htmlFor={`checkbox-${task.taskId}`} className="checkbox-label">
            {task.status && <img src={checkedIcon} alt="Checked" />} {/* Display checked icon when checked */}
          </label>
        </div>
        <div className="task-card-contents">
          <div className="task-card-title">
            <div className="task-card-text">
              <p>{task.title}</p>
              <span className={`indicator ${showCompletedStyle ? 'indicated' : ''}`}></span>
            </div>
            <div className="task-card-buttons">
              <img src={editIcon} onClick={() => editTaskHandle(task)} alt="Edit" />
              <img src={deleteIcon} onClick={() => handleDeleteClick(task)} alt="Delete" />
            </div>
          </div>
          <div className='task-description'>{task.description}</div>
          <div className={`card-date ${showOverdueStyle ? 'overdue' : ''}`}>
            <img src={calendarIcon} alt="Due Date" />
            <p>{task.dueDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
