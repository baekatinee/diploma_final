import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';

const DeleteButton = ({ onClick }) => {
  return (
    <button className="delete-button" onClick={onClick}
    style={{
        border: '1px solid red',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        padding: '8px',
      }}>
      <AiOutlineDelete className="delete-icon" color='red' 
      />
    </button>
  );
};

export default DeleteButton;
