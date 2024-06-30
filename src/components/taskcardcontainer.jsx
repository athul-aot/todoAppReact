// taskcardcontainer.jsx
import React from 'react';
import TaskCard from './taskcard';
import '../styles/Index.css';

function TaskCardContainer({ taskContainerName, tasks, editTaskHandle, toggleTaskStatus, handleDeleteClick, clearCompletedTasks }) {
  return (
    <div className='task-container'>
      <div className='task-container-header'>
        <p>{taskContainerName}</p>
        {taskContainerName === "Completed Tasks" && (
          <button className="clear-tasks-button" onClick={clearCompletedTasks}>
            Clear Completed Tasks
          </button>
        )}
      </div>
      <div className='task-child'>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskCard
              key={index}
              task={task}
              editTaskHandle={editTaskHandle}
              toggleTaskStatus={toggleTaskStatus}
              handleDeleteClick={handleDeleteClick}
            />
          ))
        ) : (
          <p>No tasks present</p>
        )}
      </div>
    </div>
  );
}

export default TaskCardContainer;
