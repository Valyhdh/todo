import React, { useState } from 'react';

export default function NewTaskForm({ onAddTask }) {
  const [description, setDescription] = useState('');

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (description.trim()) {
      onAddTask(description);
      setDescription('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          autoFocus
          value={description}
          onChange={handleChange}
        />
      </form>
    </header>
  );
}
