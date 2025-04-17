import React, { Component } from 'react';

import Task from '../Task/Task';

class TaskList extends Component {
  render() {
    const { tasks, onDelete, onComplete, onEdit } = this.props;
    return (
      <ul className="todo-list">
        {tasks.map((task) => (
          <Task
            key={`task${task.id}`}
            task={task}
            onEdit={() => onEdit(task.id)}
            onDelete={() => onDelete(task.id)}
            onComplete={() => onComplete(task.id)}
          />
        ))}
      </ul>
    );
  }
}

export default TaskList;
