import React, { useState } from 'react';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const addTask = (description) => {
    const newTask = {
      id: Date.now(),
      description: description,
      completed: false,
      created: new Date(),
    };
    setTasks([newTask, ...tasks]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newDescription) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, description: newDescription };
        }
        return task;
      })
    );
  };

  const clearComplete = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const сompleteTask = (id) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  const filterTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <section className="todoapp">
      <NewTaskForm onAddTask={addTask} />
      <TaskList tasks={filterTasks} onDelete={deleteTask} onComplete={сompleteTask} onEditTask={editTask} />
      <Footer tasks={tasks} onClearComplete={clearComplete} filter={filter} onFilterChange={changeFilter} />
    </section>
  );
}
