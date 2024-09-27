import React, { useEffect, useState } from 'react';
import Message from '../message/Message';
import './getmessage.css';
import axios from 'axios';
import PostMessage from '../postMessage/PostMessage';

const GetMessage = () => {
  const [messages, setMessages] = useState([]);
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchText, setSearchText] = useState('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get('https://5kk4vqax9a.execute-api.eu-north-1.amazonaws.com/api/getmessages');
      const filteredMessages = response.data.filter(message => message.id && message.text);
      setMessages(filteredMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const updateMessage = async (id, newText, newUsername) => {
    try {
      await axios.put(`https://5kk4vqax9a.execute-api.eu-north-1.amazonaws.com/api/updatemessage/${id}`, {
        username: newUsername,
        text: newText
      });
      const updatedMessages = messages.map(msg =>
        msg.id === id ? { ...msg, username: newUsername, text: newText } : msg
      );
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  const sortMessages = () => {
    const sortedMessages = [...messages].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setMessages(sortedMessages);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredMessages = messages.filter(message =>
    message.username && message.username.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    fetchMessages();
  }, []);

  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://5kk4vqax9a.execute-api.eu-north-1.amazonaws.com/api/deletemessage/${id}`);
      setMessages((prevMessages) => prevMessages.filter((message) => message.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  return (
    <div className="message-container">
      <h1 className="header">Shui</h1>
      <div className="search-sort-container">
        <input
          type="text"
          placeholder="Sök efter användarnamn..."
          value={searchText}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="sort-btn" onClick={sortMessages}>
          {sortOrder === 'asc' ? '▲' : '▼'}
        </button>
      </div>
      <div className="message-list">
        {filteredMessages.length === 0 ? (
          <p>
            {searchText
              ? 'Inga meddelanden hittades för den angivna användaren.'
              : 'Inga meddelanden hittades. Var snäll och lägg till ett meddelande!'}
          </p>
        ) : (
          filteredMessages.map((message) => (
            <Message key={message.id} message={message} onUpdate={updateMessage} onDelete={handleDelete} />
          ))
        )}
      </div>
      <PostMessage addMessage={addMessage} />
    </div>
  );
};

export default GetMessage;
