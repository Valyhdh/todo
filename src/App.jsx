import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      filter: 'all',
    };

    this.addTask = this.addTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.clearComplete = this.clearComplete.bind(this);
    this.completeTask = this.completeTask.bind(this);
    this.changeFilter = this.changeFilter.bind(this);
  }

  addTask(description) {
    const newTask = {
      id: Date.now(),
      description: description,
      completed: false,
      created: new Date(),
    };
    this.setState((prevState) => ({
      tasks: [newTask, ...prevState.tasks],
    }));
  }

  deleteTask(id) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => task.id !== id),
    }));
  }

  editTask(id, newDescription) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          console.log(task);
          return { ...task, description: newDescription };
        }
        return task;
      }),
    }));
  }

  clearComplete() {
    this.setState((prevState) => ({
      tasks: prevState.tasks.filter((task) => !task.completed),
    }));
  }

  completeTask(id) {
    this.setState((prevState) => ({
      tasks: prevState.tasks.map((task) => {
        if (task.id === id) {
          console.log(task);
          return { ...task, completed: !task.completed };
        }
        return task;
      }),
    }));
  }

  changeFilter(newFilter) {
    this.setState({ filter: newFilter });
  }

  filterTasks() {
    const { tasks, filter } = this.state;
    return tasks.filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    });
  }

  render() {
    const { tasks, filter } = this.state;
    const filteredTasks = this.filterTasks();

    return (
      <section className="todoapp">
        <NewTaskForm onAddTask={this.addTask} />
        <TaskList
          tasks={filteredTasks}
          onDelete={this.deleteTask}
          onComplete={this.completeTask}
          onEdit={this.editTask}
        />
        <Footer tasks={tasks} onClearComplete={this.clearComplete} filter={filter} onFilterChange={this.changeFilter} />
      </section>
    );
  }
}

export default App;
