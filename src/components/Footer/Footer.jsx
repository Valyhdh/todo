import TasksFilter from '../TasksFilter/TasksFilter';

export default function Footer({ tasks, onClearComplete, filter, onFilterChange }) {
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
