import Task from '../Task/Task';

export default function TaskList({ tasks, onDelete, onComplete, onEditTask }) {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <Task
          key={`task${task.id}`}
          task={task}
          onEditTask={() => onEditTask()}
          onDelete={() => onDelete(task.id)}
          onComplete={() => onComplete(task.id)}
        />
      ))}
    </ul>
  );
}
