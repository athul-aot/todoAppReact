// Index.jsx
import React, { useState, useEffect } from 'react';
import '../styles/Index.css';
import Header from '../components/header';
import SearchSort from '../components/sort_search';
import TaskCardContainer from '../components/taskcardcontainer';
import TaskForm from '../components/taskform';
import DeleteConfirmation from '../components/deleteConfirmation';

function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [taskAdd, setTaskAdd] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDeletePopupVisible, setIsDeletePopupVisible] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [sortOrder, setSortOrder] = useState('desc'); // State for sort order

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (storedTasks.length) {
      setTaskAdd(storedTasks);
    }
    console.log("Tasks loaded:", storedTasks);
  }, []);

  const showModel = () => {
    setCurrentTask(null);
    setIsEditing(false);
    setIsVisible(true);
  };

  const closeModel = () => {
    setIsVisible(false);
  };

  const addTask = (task) => {
    const taskWithDate = { ...task, date: new Date().toISOString() }; // Ensure new task has a date
    const updatedTasks = [...taskAdd, taskWithDate];
    setTaskAdd(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const editTask = (updatedTask) => {
    const updatedTasks = taskAdd.map(task =>
      task.taskId === updatedTask.taskId ? { ...updatedTask, date: task.date } : task // Keep original date
    );
    setTaskAdd(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setIsEditing(false);
    setIsVisible(false);
  };

  const editTaskPopUp = (task) => {
    setCurrentTask(task);
    setIsEditing(true);
    setIsVisible(true);
  };

  const toggleTaskStatus = (task) => {
    const updatedTasks = taskAdd.map(t =>
      t.taskId === task.taskId ? { ...t, status: !t.status } : t
    );
    setTaskAdd(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const clearCompletedTasks = () => {
    const activeTasks = taskAdd.filter(task => !task.status);
    setTaskAdd(activeTasks);
    localStorage.setItem('tasks', JSON.stringify(activeTasks));
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleDeleteClick = (task) => {
    setTaskToDelete(task);
    setIsDeletePopupVisible(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      const updatedTasks = taskAdd.filter(task => task.taskId !== taskToDelete.taskId);
      setTaskAdd(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      setTaskToDelete(null);
    }
    setIsDeletePopupVisible(false);
  };

  const cancelDelete = () => {
    setIsDeletePopupVisible(false);
    setTaskToDelete(null);
  };

  const filteredTasks = taskAdd.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const activeTasks = sortedTasks.filter(task => !task.status);
  const completedTasks = sortedTasks.filter(task => task.status);

  return (
    <div className='parent'>
      <Header handlePopUp={showModel} handleSearch={handleSearch} />
      {isVisible && (
        <TaskForm
          closePopUp={closeModel}
          addTask={addTask}
          editTask={editTask}
          taskToEdit={currentTask}
        />
      )}
      <SearchSort handleSearch={handleSearch} handleSortChange={handleSortChange} />
      <TaskCardContainer
        taskContainerName={"Active Tasks"}
        tasks={activeTasks}
        editTaskHandle={editTaskPopUp}
        toggleTaskStatus={toggleTaskStatus}
        handleDeleteClick={handleDeleteClick}
      />
      <TaskCardContainer
        taskContainerName={"Completed Tasks"}
        tasks={completedTasks}
        editTaskHandle={editTaskPopUp}
        toggleTaskStatus={toggleTaskStatus}
        clearCompletedTasks={clearCompletedTasks}
        handleDeleteClick={handleDeleteClick}
      />
      {isDeletePopupVisible && (
        <DeleteConfirmation confirmDelete={confirmDelete} cancelDelete={cancelDelete} />
      )}
    </div>
  );
}

export default Index;
