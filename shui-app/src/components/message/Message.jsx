import React, { useState } from 'react';
import './message.css';

const Message = ({ message, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(message.text);
  const [newUsername, setNewUsername] = useState(message.username);

  const handleEdit = () => {
    if (isEditing) {
      onUpdate(message.id, newText, newUsername); 
    }
    setIsEditing(!isEditing);
  };

  return (
    <div className="message">
      <div className="message-header">
        <strong>{isEditing ? (
          <input
            type="text"
            className="message-edit"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        ) : (
          message.username || 'Anonym'
        )}</strong>
        <button className="delete-btn" onClick={() => onDelete(message.id)}>✖️</button>
      </div>
      {isEditing ? (
        <textarea
          className="message-edit"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      ) : (
        <p>{message.text}</p>
      )}
      <div className="message-footer">
        <small>{new Date(message.createdAt).toLocaleString()}</small>
        <button className="edit-btn" onClick={handleEdit}>
          {isEditing ? '💾' : '🖉'}
        </button>
      </div>
    </div>
  );
};

export default Message;
