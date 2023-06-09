import React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

const EditButton = ({ onClick }) => {
  return (
    <button
      className="edit-button"
      onClick={onClick}
      style={{
        border: '1px solid gray',
        borderRadius: '4px',
        backgroundColor: 'transparent',
        padding: '8px',
      }}
    >
      <AiOutlineEdit className="edit-icon" />
    </button>
  );
};

export default EditButton;