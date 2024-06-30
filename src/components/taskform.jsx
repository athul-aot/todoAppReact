import React from "react";
import { useEffect } from "react";
import Input from "./input";
import closeIcon from "../assets/close.svg";
function TaskForm({ closePopUp, addTask, editTask, taskToEdit }) {
  useEffect(() => {
    if (taskToEdit) {
      document.getElementById("task-title").value = taskToEdit.title;
      document.getElementById("task-description").value =
        taskToEdit.description;
      document.getElementById("task-duedate").value = taskToEdit.dueDate;
    }
  }, [taskToEdit]);

  const handleSubmit = () => {
    let taskTitle = document.getElementById("task-title").value;
    let taskDescription = document.getElementById("task-description").value;
    let taskDueDate = document.getElementById("task-duedate").value;

    if (taskTitle && taskDescription && taskDueDate) {
      let task = {
        ...taskToEdit,
        taskId: taskToEdit ? taskToEdit.taskId : Date.now(),
        title: taskTitle,
        description: taskDescription,
        dueDate: taskDueDate,
      };

      if (taskToEdit) {
        editTask(task);
      } else {
        addTask(task);
      }

      clearTextFields();
    }
  };

  const clearTextFields = () => {
    document.getElementById("task-title").value = "";
    document.getElementById("task-description").value = "";
    document.getElementById("task-duedate").value = "";
    closePopUp();
  };

  return (
    <div className="task-form-container">
      <div className="task-form">
        <div className="task-form-header">
          <p>{taskToEdit ? "Edit Task" : "Add Task"}</p>
          <img src={closeIcon} alt="close" onClick={closePopUp} />
        </div>
        <div className="task-form-inputs">
          <div className="task-form-inputs-item">
            <p>Title</p>
            <div className="input-parent">
              <Input
                type={"text"}
                placeholder={"eg: Create two banners"}
                className={"form-input"}
                id={"task-title"}
              />
            </div>
          </div>
          <div className="task-form-inputs-item">
            <p>Description</p>
            <div className="input-parent">
              <textarea
                rows={3}
                cols={69}
                id="task-description"
                className="input-parent"
                placeholder="Add description"
              ></textarea>
            </div>
          </div>
          <div className="task-form-inputs-item">
            <p>Due Date</p>
            <div className="input-parent">
              <Input type={"date"} id={"task-duedate"} />
            </div>
          </div>
          <div className="form-buttons">
            <button onClick={closePopUp}>Close</button>
            <button className="add-task" onClick={handleSubmit}>
              {taskToEdit ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskForm;
