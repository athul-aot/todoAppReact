// deleteConfirmation.jsx
import React from 'react';
import '../styles/Index.css'; // Ensure to style this component

function DeleteConfirmation({ confirmDelete, cancelDelete }) {
  return (
    <div className="delete-confirmation-popup">
      <div className="delete-confirmation-content">
        <p>Are you sure you want to delete this task?</p>
        <button onClick={confirmDelete} className="confirm-button">Delete</button>
        <button onClick={cancelDelete} className="cancel-button">Cancel</button>
      </div>
    </div>
  );
}

export default DeleteConfirmation;