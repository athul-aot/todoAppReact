// deleteConfirmation.jsx
import React from 'react';
import '../styles/Index.css'; // Ensure to style this component

function DeleteConfirmation({ confirmDelete, cancelDelete }) {
  return (
    <div className="delete-confirmation-popup">
      <div className="delete-confirmation-content">
        <div className='delete-content-sub'>
          <p className='delete-title'>Delete Task ?</p>
        <p>Are you sure you want to delete this task?</p>
        <div>
        <button onClick={cancelDelete} className="cancel-button">Cancel</button>
        <button onClick={confirmDelete} className="confirm-button">Delete</button>
        </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmation;