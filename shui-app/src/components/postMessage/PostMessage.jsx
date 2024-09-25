import React, { useState } from 'react';
import axios from 'axios'; 
import './postMessage.css';

const PostMessage = ({ addMessage }) => {
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username && text) {
        const messageData = {
            username,
            text,
            createdAt: new Date().toISOString(),
        };

        try {
            const response = await axios.post('https://5kk4vqax9a.execute-api.eu-north-1.amazonaws.com/api/messages', messageData);
            const newMessage = response.data.data;
            addMessage(newMessage); 
            setUsername(''); 
            setText('');
        } catch (error) {
            console.error('Error posting message:', error);
        }
    }
};

  return (
    <form className="post-message-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Ditt namn"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Skriv ett meddelande"
        required
      />
      <button type="submit">Publicera</button>
    </form>
  );
};

export default PostMessage;
