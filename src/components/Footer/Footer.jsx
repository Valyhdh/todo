import React, { Component } from 'react';

import TasksFilter from '../TasksFilter/TasksFilter';

class Footer extends Component {
  render() {
    const { tasks, onClearComplete, filter, onFilterChange } = this.props;
    const countTasks = tasks.filter((task) => !task.completed).length;

    return (
      <footer className="footer">
        <span className="todo-count">{countTasks} items left</span>
        <ul className="filters">
          <TasksFilter filter={filter} onFilterChange={onFilterChange} />
        </ul>
        <button className="clear-completed" onClick={onClearComplete}>
          Clear completed
        </button>
      </footer>
    );
  }
}

export default Footer;
